import { useEffect, useRef } from 'react';

interface NetworkBackgroundProps {
  opacity?: number;
}

export function NetworkBackground({ opacity = 0.5 }: NetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to fill container
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };
    resize();
    window.addEventListener('resize', resize);

    // Node configuration
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
    }

    const nodes: Node[] = [];
    const nodeCount = 40;
    const connectionDistance = 150;

    // Initialize nodes
    const rect = canvas.getBoundingClientRect();
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    let animationId: number;

    const animate = () => {
      const currentRect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, currentRect.width, currentRect.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > currentRect.width) node.vx *= -1;
        if (node.y < 0 || node.y > currentRect.height) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(currentRect.width, node.x));
        node.y = Math.max(0, Math.min(currentRect.height, node.y));

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${opacity})`; // loggie-purple
        ctx.fill();

        // Draw connections to nearby nodes
        nodes.slice(i + 1).forEach((other) => {
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - dist / connectionDistance) * opacity * 0.4})`; // loggie-cyan
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    />
  );
}
