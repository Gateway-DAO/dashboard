'use client';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import Lenis from '@studio-freight/lenis';

const LenisContext = createContext<Lenis | null>(null);

export default function LenisProvider({ children }: PropsWithChildren) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis();
    setLenis(lenisRef.current);
    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

export const useLenisS = () => useContext(LenisContext);
