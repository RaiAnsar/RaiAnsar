'use client';

/**
 * Lazily loads all non-critical visual effects after hydration.
 * - ssr:false removes these from the initial JS bundle entirely
 * - Desktop-only effects (LiquidBlob, CustomCursor) are skipped on mobile/touch
 *   to avoid loading the framer-motion chunk on mobile, improving mobile LCP
 * - ScrollProgress and BackToTop are now CSS-only (no framer-motion)
 */

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Desktop-only effects that use framer-motion
const LiquidBlob = dynamic(
  () => import('@/components/ui/LiquidBlob').then((m) => ({ default: m.LiquidBlob })),
  { ssr: false }
);
const CustomCursor = dynamic(
  () => import('@/components/ui/CustomCursor').then((m) => ({ default: m.CustomCursor })),
  { ssr: false }
);

// Universal effects — now CSS-only, no framer-motion
const ScrollProgress = dynamic(
  () => import('@/components/ui/ScrollProgress').then((m) => ({ default: m.ScrollProgress })),
  { ssr: false }
);
const BackToTop = dynamic(
  () => import('@/components/ui/BackToTop').then((m) => ({ default: m.BackToTop })),
  { ssr: false }
);
const DeferredEffects = dynamic(
  () => import('@/components/ui/DeferredEffects').then((m) => ({ default: m.DeferredEffects })),
  { ssr: false }
);

export function ClientEffects() {
  // Only load cursor/blob effects on fine-pointer (desktop) devices.
  // On mobile/touch, these are useless and their framer-motion dependency
  // wastes ~37KB gzip on the critical mobile path.
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia('(pointer: fine)').matches);
  }, []);

  return (
    <>
      {isDesktop && <LiquidBlob />}
      {isDesktop && <CustomCursor />}
      <ScrollProgress />
      <BackToTop />
      <DeferredEffects />
    </>
  );
}
