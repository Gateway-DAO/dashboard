import Lenis from '@studio-freight/lenis';

let LenisManager: Lenis | null = null;

function rAF(time: number) {
  LenisManager?.raf(time);

  requestAnimationFrame(rAF);
}

export function initializeLenis() {
  LenisManager = new Lenis({
    duration: 1,
    wheelMultiplier: 1,
  });

  requestAnimationFrame(rAF);
}

export interface IInstanceOptions {
  direction: number;
  limit: number;
  progress: number;
  scroll: number;
  velocity: number;
}

export default LenisManager;
