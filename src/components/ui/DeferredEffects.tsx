'use client';

import { useEffect, useState } from 'react';
import { ParticleField } from '@/components/ui/ParticleField';

type IdleCallbackHandle = number;

export function DeferredEffects() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => IdleCallbackHandle;
      cancelIdleCallback?: (handle: IdleCallbackHandle) => void;
    };

    const handle =
      w.requestIdleCallback?.(() => setEnabled(true), { timeout: 1500 }) ??
      window.setTimeout(() => setEnabled(true), 400);

    return () => {
      if (typeof handle === 'number' && w.cancelIdleCallback && w.requestIdleCallback) {
        w.cancelIdleCallback(handle);
      } else {
        window.clearTimeout(handle);
      }
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <ParticleField />
    </>
  );
}
