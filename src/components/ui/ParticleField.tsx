'use client';

import { useEffect, useRef, useState } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
};

const COLORS = ['rgba(0,255,240,0.65)', 'rgba(153,69,255,0.55)', 'rgba(255,45,146,0.45)', 'rgba(255,255,255,0.35)'];

function shouldEnableEffects() {
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  const pointerCoarse = window.matchMedia?.('(pointer: coarse)')?.matches;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const saveData = connection?.saveData;
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency;

  if (prefersReducedMotion) return false;
  if (pointerCoarse) return false;
  if (saveData) return false;
  if (typeof deviceMemory === 'number' && deviceMemory > 0 && deviceMemory < 4) return false;
  if (typeof cores === 'number' && cores > 0 && cores < 4) return false;

  return true;
}

function createParticles(width: number, height: number, count: number) {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i += 1) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      size: Math.random() * 1.8 + 0.8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? COLORS[0],
    });
  }
  return particles;
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(shouldEnableEffects());
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const state = {
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      width: 0,
      height: 0,
      particles: [] as Particle[],
      lastFrameAt: 0,
    };

    const lineDistance = 140;
    const lineDistanceSq = lineDistance * lineDistance;
    const targetFps = 30;
    const frameInterval = 1000 / targetFps;

    const resize = () => {
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;
      canvas.width = Math.floor(state.width * state.dpr);
      canvas.height = Math.floor(state.height * state.dpr);

      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

      const count = Math.max(18, Math.min(38, Math.floor((state.width * state.height) / 65000)));
      state.particles = createParticles(state.width, state.height, count);
    };

    resize();

    const onResize = () => resize();
    window.addEventListener('resize', onResize, { passive: true });

    const draw = (now: number) => {
      animationRef.current = requestAnimationFrame(draw);

      if (document.visibilityState === 'hidden') return;
      if (state.lastFrameAt && now - state.lastFrameAt < frameInterval) return;
      state.lastFrameAt = now;

      ctx.clearRect(0, 0, state.width, state.height);

      // Update positions
      for (const p of state.particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = state.width + 20;
        if (p.x > state.width + 20) p.x = -20;
        if (p.y < -20) p.y = state.height + 20;
        if (p.y > state.height + 20) p.y = -20;
      }

      // Connection lines (subtle)
      ctx.lineWidth = 1;
      for (let i = 0; i < state.particles.length; i += 1) {
        const p1 = state.particles[i]!;
        for (let j = i + 1; j < state.particles.length; j += 1) {
          const p2 = state.particles[j]!;
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > lineDistanceSq) continue;

          const alpha = 0.08 * (1 - distSq / lineDistanceSq);
          ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(4)})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // Particles
      for (const p of state.particles) {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', onResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
      aria-hidden="true"
    />
  );
}
