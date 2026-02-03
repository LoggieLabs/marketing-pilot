import { useEffect, useRef } from 'react';

/**
 * Static blueprint lattice background for mechanism sections.
 * Same lattice family as hero, but:
 * - No pulses, no drift
 * - Lower contrast (6-8% opacity)
 * - Subtle left→right gradient emphasis (reinforces flow)
 * - Vignette to keep focus on content
 *
 * "Blueprint view" vs hero's "Live system view"
 */
export function BlueprintLattice() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      draw();
    };

    const draw = () => {
      // Clear with base color
      ctx.fillStyle = '#07080C';
      ctx.fillRect(0, 0, width, height);

      // Directional gradient: subtle left→right emphasis
      // Reinforces the flow arrows subconsciously
      const flowGradient = ctx.createLinearGradient(0, 0, width, 0);
      flowGradient.addColorStop(0, 'rgba(56, 189, 207, 0.015)');
      flowGradient.addColorStop(0.5, 'rgba(56, 189, 207, 0.025)');
      flowGradient.addColorStop(1, 'rgba(56, 189, 207, 0.015)');
      ctx.fillStyle = flowGradient;
      ctx.fillRect(0, 0, width, height);

      // Build deterministic hexagonal grid (same family as hero)
      const hexRadius = 60;
      const hexHeight = hexRadius * Math.sqrt(3);
      const cols = Math.ceil(width / (hexRadius * 1.5)) + 4;
      const rows = Math.ceil(height / hexHeight) + 4;
      const offsetX = -hexRadius * 2;
      const offsetY = -hexHeight;

      // Collect nodes
      const nodes: { x: number; y: number; col: number; row: number }[] = [];
      const nodeMap: Map<string, number> = new Map();

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = offsetX + col * hexRadius * 1.5;
          const y = offsetY + row * hexHeight + (col % 2) * (hexHeight / 2);
          const key = `${col},${row}`;
          nodeMap.set(key, nodes.length);
          nodes.push({ x, y, col, row });
        }
      }

      // Draw connection lines - very subtle, matte, no glow
      // Opacity 6-8%, thinner than hero
      ctx.strokeStyle = 'rgba(56, 189, 207, 0.06)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();

      nodes.forEach((node, idx) => {
        const { col, row } = node;
        const neighborOffsets = col % 2 === 0
          ? [[-1, -1], [-1, 0], [0, -1], [0, 1], [1, -1], [1, 0]]
          : [[-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0], [1, 1]];

        neighborOffsets.forEach(([dc, dr]) => {
          const neighborKey = `${col + dc},${row + dr}`;
          const neighborIdx = nodeMap.get(neighborKey);
          if (neighborIdx !== undefined && neighborIdx > idx) {
            const neighbor = nodes[neighborIdx];
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(neighbor.x, neighbor.y);
          }
        });
      });
      ctx.stroke();

      // Draw nodes - very subtle, no glow
      ctx.fillStyle = 'rgba(56, 189, 207, 0.08)';
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Vignette - keeps focus on content
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.2,
        width / 2, height / 2, height * 0.8
      );
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(1, 'rgba(7, 8, 12, 0.5)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Subtle top/bottom fade for section blending
      const topFade = ctx.createLinearGradient(0, 0, 0, 80);
      topFade.addColorStop(0, 'rgba(7, 8, 12, 0.8)');
      topFade.addColorStop(1, 'transparent');
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, width, 80);

      const bottomFade = ctx.createLinearGradient(0, height - 80, 0, height);
      bottomFade.addColorStop(0, 'transparent');
      bottomFade.addColorStop(1, 'rgba(7, 8, 12, 0.8)');
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, height - 80, width, 80);
    };

    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: '#07080C' }}
      aria-hidden="true"
    />
  );
}
