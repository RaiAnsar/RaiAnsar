'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: { x: number; y: number };
  opacity: number;
}

export function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    setIsMounted(true);

    const colors = ['#00fff0', '#ff2d92', '#9945ff', '#ffffff'];
    const width = window.innerWidth;
    const height = window.innerHeight;

    const initialParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocity: {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
      },
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticles(initialParticles);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          // Calculate distance from mouse
          const dx = mousePos.x - particle.x;
          const dy = mousePos.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          // Repel particles from mouse
          let newVx = particle.velocity.x;
          let newVy = particle.velocity.y;

          if (distance < maxDistance && distance > 0) {
            const force = (maxDistance - distance) / maxDistance;
            newVx -= (dx / distance) * force * 0.5;
            newVy -= (dy / distance) * force * 0.5;
          }

          // Apply some friction
          newVx *= 0.99;
          newVy *= 0.99;

          // Add some random movement
          newVx += (Math.random() - 0.5) * 0.1;
          newVy += (Math.random() - 0.5) * 0.1;

          // Update position
          let newX = particle.x + newVx;
          let newY = particle.y + newVy;

          // Wrap around screen
          const screenWidth = window.innerWidth || 1920;
          const screenHeight = window.innerHeight || 1080;
          if (newX < 0) newX = screenWidth;
          if (newX > screenWidth) newX = 0;
          if (newY < 0) newY = screenHeight;
          if (newY > screenHeight) newY = 0;

          return {
            ...particle,
            x: newX,
            y: newY,
            velocity: { x: newVx, y: newVy },
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mousePos]);

  // Don't render until mounted on client to avoid hydration mismatch
  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {particles.map((p1, i) =>
          particles.slice(i + 1).map((p2) => {
            const distance = Math.sqrt(
              Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
            );
            if (distance < 120) {
              return (
                <line
                  key={`${p1.id}-${p2.id}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="rgba(0, 255, 240, 0.1)"
                  strokeWidth={0.5 * (1 - distance / 120)}
                />
              );
            }
            return null;
          })
        )}
      </svg>

      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
}
