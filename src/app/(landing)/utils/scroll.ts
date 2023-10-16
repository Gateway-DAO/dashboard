import Lenis from '@studio-freight/lenis';

let LenisManager: Lenis | null = null;

function rAF(time: number) {
  LenisManager?.raf(time);

  requestAnimationFrame(rAF);
}

export function initLenis() {
  const lenis = new Lenis({
    duration: 1,
    wheelMultiplier: 1,
  });

  requestAnimationFrame(rAF);
  return lenis;
}

if (typeof window !== 'undefined') {
  LenisManager = initLenis();
}

export default LenisManager;
