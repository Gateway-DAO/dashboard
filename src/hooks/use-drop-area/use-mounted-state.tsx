"use client";

import { useCallback, useEffect, useRef } from 'react';
/**
 * Returns a function that returns the current mounted state of the component.
 * Copied from "react-use"
 */
export default function useMountedState(): () => boolean {
  const mountedRef = useRef<boolean>(false);
  const get = useCallback(() => mountedRef.current, []);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return get;
}
