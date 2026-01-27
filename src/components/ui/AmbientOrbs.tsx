'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OrbConfig {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

interface AmbientOrbsProps {
  color: string;
  count?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
}

export function AmbientOrbs({
  color,
  count = 3,
  minSize = 40,
  maxSize = 80,
  className = '',
}: AmbientOrbsProps) {
  // Use useState + useEffect to avoid hydration mismatch
  // Random values are only generated on the client after mount
  const [orbs, setOrbs] = useState<OrbConfig[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Generate random orb configurations only on client
    const generatedOrbs = Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * (maxSize - minSize) + minSize,
      x: Math.random() * 80 + 10, // Keep 10-90% to avoid edges
      y: Math.random() * 80 + 10,
      duration: Math.random() * 8 + 12, // 12-20s
      delay: Math.random() * 4,
    }));
    setOrbs(generatedOrbs);
    setMounted(true);
  }, [count, minSize, maxSize]);

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        className={`absolute inset-0 overflow-hidden rounded-3xl pointer-events-none ${className}`}
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 overflow-hidden rounded-3xl pointer-events-none ${className}`}
    >
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            x: [0, 25, -15, 10, 0],
            y: [0, -20, 15, -10, 0],
            scale: [1, 1.15, 0.95, 1.1, 1],
            opacity: [0.15, 0.25, 0.18, 0.22, 0.15],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Floating particles variant for more subtle effect
interface ParticleConfig {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

interface FloatingParticlesProps {
  color: string;
  count?: number;
  className?: string;
}

export function FloatingParticles({
  color,
  count = 5,
  className = '',
}: FloatingParticlesProps) {
  // Use useState + useEffect to avoid hydration mismatch
  const [particles, setParticles] = useState<ParticleConfig[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Generate random particle configurations only on client
    const generatedParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      duration: Math.random() * 6 + 8,
      delay: Math.random() * 3,
    }));
    setParticles(generatedParticles);
    setMounted(true);
  }, [count]);

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        className={`absolute inset-0 overflow-hidden rounded-3xl pointer-events-none ${className}`}
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 overflow-hidden rounded-3xl pointer-events-none ${className}`}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: color,
            boxShadow: `0 0 ${particle.size * 3}px ${color}`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            y: [0, -40, -20, -60, 0],
            x: [0, 10, -5, 15, 0],
            opacity: [0.2, 0.5, 0.3, 0.4, 0.2],
            scale: [1, 1.3, 1.1, 1.4, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
