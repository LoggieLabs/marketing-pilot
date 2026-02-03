import { useEffect, useRef, useState } from 'react';

interface HexNode {
  x: number;
  y: number;
  col: number;
  row: number;
  neighbors: number[];
}

interface VerificationPulse {
  x: number;
  y: number;
  startTime: number;
  duration: number;
}

export function AbstractBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    // Colors
    const nodeColor = { r: 56, g: 189, b: 207 }; // Muted cyan/teal
    const pulseColorStart = { r: 74, g: 222, b: 128 }; // Soft green
    const pulseColorEnd = { r: 34, g: 211, b: 238 }; // Cyan

    // Build deterministic hexagonal grid
    const hexRadius = 60; // Distance between nodes
    const hexHeight = hexRadius * Math.sqrt(3);
    const nodes: HexNode[] = [];
    const nodeMap: Map<string, number> = new Map();

    // Calculate grid bounds with padding
    const cols = Math.ceil(width / (hexRadius * 1.5)) + 4;
    const rows = Math.ceil(height / hexHeight) + 4;
    const offsetX = -hexRadius * 2;
    const offsetY = -hexHeight;

    // Create hexagonal lattice
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = offsetX + col * hexRadius * 1.5;
        const y = offsetY + row * hexHeight + (col % 2) * (hexHeight / 2);
        const key = `${col},${row}`;
        nodeMap.set(key, nodes.length);
        nodes.push({ x, y, col, row, neighbors: [] });
      }
    }

    // Build neighbor connections (hexagonal topology)
    nodes.forEach((node, idx) => {
      const { col, row } = node;
      const neighborOffsets = col % 2 === 0
        ? [[-1, -1], [-1, 0], [0, -1], [0, 1], [1, -1], [1, 0]]
        : [[-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0], [1, 1]];

      neighborOffsets.forEach(([dc, dr]) => {
        const neighborKey = `${col + dc},${row + dr}`;
        const neighborIdx = nodeMap.get(neighborKey);
        if (neighborIdx !== undefined && neighborIdx > idx) {
          node.neighbors.push(neighborIdx);
        }
      });
    });

    // Verification pulse state
    let activePulse: VerificationPulse | null = null;
    let lastPulseTime = 0;
    const pulseInterval = 8000; // 8 seconds between pulses
    const pulseDuration = 2800; // 2.8 seconds per pulse

    // Verification horizon - a subtle bias zone where pulses tend to originate
    // Diagonal band from lower-left to upper-right, roughly 60% down the screen
    const horizonCenterY = height * 0.6;
    const horizonBandWidth = height * 0.25;

    const triggerPulse = (time: number) => {
      // Filter nodes within verification horizon (biased zone)
      const horizonNodes = nodes.filter(n =>
        n.x > width * 0.15 && n.x < width * 0.85 &&
        Math.abs(n.y - (horizonCenterY + (n.x - width / 2) * 0.15)) < horizonBandWidth
      );

      // Fallback to center area if horizon has no nodes
      const eligibleNodes = horizonNodes.length > 0 ? horizonNodes : nodes.filter(n =>
        n.x > width * 0.2 && n.x < width * 0.8 &&
        n.y > height * 0.3 && n.y < height * 0.8
      );

      if (eligibleNodes.length === 0) return;

      // Deterministic selection based on time (not random)
      const selectedIdx = Math.floor((time / 1000) % eligibleNodes.length);
      const node = eligibleNodes[selectedIdx];

      activePulse = {
        x: node.x,
        y: node.y,
        startTime: time,
        duration: pulseDuration,
      };
      lastPulseTime = time;
    };

    // Time drift parameters
    const driftCycleDuration = 150000; // 150 seconds
    const driftAmplitudeX = 15;
    const driftAmplitudeY = 25;

    let startTime = performance.now();

    const draw = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      // Clear with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#07080C');
      gradient.addColorStop(1, '#0B0F18');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Calculate time drift (slow diagonal movement)
      let driftX = 0;
      let driftY = 0;
      if (!prefersReducedMotion) {
        const driftProgress = (elapsed % driftCycleDuration) / driftCycleDuration;
        const driftAngle = driftProgress * Math.PI * 2;
        driftX = Math.sin(driftAngle) * driftAmplitudeX;
        driftY = Math.cos(driftAngle * 0.7) * driftAmplitudeY; // Slightly different frequency for organic feel
      }

      ctx.save();
      ctx.translate(driftX, driftY);

      // Draw connection lines (static topology) - subtle, structure recedes
      ctx.strokeStyle = `rgba(${nodeColor.r}, ${nodeColor.g}, ${nodeColor.b}, 0.08)`;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      nodes.forEach((node) => {
        node.neighbors.forEach((neighborIdx) => {
          const neighbor = nodes[neighborIdx];
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(neighbor.x, neighbor.y);
        });
      });
      ctx.stroke();

      // Draw nodes (fixed positions, only opacity varies slightly based on pulse proximity)
      // Base opacity reduced so pulse illumination does more of the work
      nodes.forEach((node) => {
        let opacity = 0.18;
        let radius = 2;
        let glowRadius = 0;

        // Check if near active pulse
        if (activePulse && !prefersReducedMotion) {
          const pulseElapsed = currentTime - activePulse.startTime;
          if (pulseElapsed < activePulse.duration) {
            const pulseProgress = pulseElapsed / activePulse.duration;
            const pulseRadius = pulseProgress * 200; // Max expansion radius
            const dist = Math.hypot(node.x - activePulse.x, node.y - activePulse.y);

            // Nodes within pulse radius get highlighted
            if (dist < pulseRadius && dist > pulseRadius - 40) {
              const intensity = 1 - Math.abs(dist - (pulseRadius - 20)) / 20;
              const fade = 1 - pulseProgress; // Fade out over time
              opacity = 0.18 + intensity * fade * 0.7; // More contrast from base
              glowRadius = intensity * fade * 10;
            }
          }
        }

        // Draw node glow (if any)
        if (glowRadius > 0) {
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
          // Interpolate between green and cyan based on pulse progress
          const pulseProgress = activePulse ? (currentTime - activePulse.startTime) / activePulse.duration : 0;
          const r = Math.round(pulseColorStart.r + (pulseColorEnd.r - pulseColorStart.r) * pulseProgress);
          const g = Math.round(pulseColorStart.g + (pulseColorEnd.g - pulseColorStart.g) * pulseProgress);
          const b = Math.round(pulseColorStart.b + (pulseColorEnd.b - pulseColorStart.b) * pulseProgress);
          glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.4)`);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor.r}, ${nodeColor.g}, ${nodeColor.b}, ${opacity})`;
        ctx.fill();
      });

      // Draw verification pulse ring (the expanding circle)
      if (activePulse && !prefersReducedMotion) {
        const pulseElapsed = currentTime - activePulse.startTime;
        if (pulseElapsed >= 0 && pulseElapsed < activePulse.duration) {
          const pulseProgress = pulseElapsed / activePulse.duration;
          const easeProgress = 1 - Math.pow(1 - pulseProgress, 2); // ease-out
          const pulseRadius = Math.max(0, easeProgress * 200);
          const fade = 1 - pulseProgress;

          // Interpolate color
          const r = Math.round(pulseColorStart.r + (pulseColorEnd.r - pulseColorStart.r) * pulseProgress);
          const g = Math.round(pulseColorStart.g + (pulseColorEnd.g - pulseColorStart.g) * pulseProgress);
          const b = Math.round(pulseColorStart.b + (pulseColorEnd.b - pulseColorStart.b) * pulseProgress);

          ctx.beginPath();
          ctx.arc(activePulse.x, activePulse.y, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${fade * 0.3})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Inner glow at origin
          const originGlow = ctx.createRadialGradient(
            activePulse.x, activePulse.y, 0,
            activePulse.x, activePulse.y, 30
          );
          originGlow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${fade * 0.5})`);
          originGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = originGlow;
          ctx.beginPath();
          ctx.arc(activePulse.x, activePulse.y, 30, 0, Math.PI * 2);
          ctx.fill();
        } else {
          activePulse = null;
        }
      }

      ctx.restore();

      // Trigger new pulse if interval passed
      if (!prefersReducedMotion && currentTime - lastPulseTime > pulseInterval && !activePulse) {
        triggerPulse(currentTime);
      }

      // Subtle vignette
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.3,
        width / 2, height / 2, height * 0.9
      );
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Headline mask - gentle darkening behind text area (upper-left quadrant)
      // Invisible to user but ensures background never competes with headline
      const headlineMask = ctx.createRadialGradient(
        width * 0.25, height * 0.4, 0,
        width * 0.25, height * 0.4, height * 0.5
      );
      headlineMask.addColorStop(0, 'rgba(7, 8, 12, 0.25)');
      headlineMask.addColorStop(0.6, 'rgba(7, 8, 12, 0.1)');
      headlineMask.addColorStop(1, 'transparent');
      ctx.fillStyle = headlineMask;
      ctx.fillRect(0, 0, width, height);

      animationRef.current = requestAnimationFrame(draw);
    };

    // Initial pulse after short delay
    setTimeout(() => triggerPulse(performance.now()), 2000);

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: '#07080C' }}
      aria-hidden="true"
    />
  );
}
