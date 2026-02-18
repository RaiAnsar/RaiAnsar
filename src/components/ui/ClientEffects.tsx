'use client';

/**
 * Lazily loads all non-critical visual effects after hydration.
 * Using ssr:false removes these from the initial JS bundle entirely,
 * eliminating the Framer Motion infinite animation loops that caused
 * 8,830ms TBT on desktop.
 */

import dynamic from 'next/dynamic';

const LiquidBlob = dynamic(
  () => import('@/components/ui/LiquidBlob').then((m) => ({ default: m.LiquidBlob })),
  { ssr: false }
);
const CustomCursor = dynamic(
  () => import('@/components/ui/CustomCursor').then((m) => ({ default: m.CustomCursor })),
  { ssr: false }
);
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
  return (
    <>
      <LiquidBlob />
      <CustomCursor />
      <ScrollProgress />
      <BackToTop />
      <DeferredEffects />
    </>
  );
}
