import { useEffect, useState } from 'react';

interface MobileDetectHookResult {
  isMobile: boolean | null;
}

const MOBILE_BREAKPOINT = 768;

const useMobileDetect = (): MobileDetectHookResult => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const handleResize = () => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile };
};

export default useMobileDetect;
