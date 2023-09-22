import { useEffect, useState } from 'react';

interface MobileDetectHookResult {
  isMobile: boolean | null;
  isTablet: boolean | null;
}

const MOBILE_BREAKPOINT = 599;
const TABLET_BREAKPOINT = 960;

const useMobileDetect = (): MobileDetectHookResult => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isTablet, setIsTablet] = useState<boolean | null>(null);

  const handleResize = () => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    setIsTablet(
      window.innerWidth < TABLET_BREAKPOINT &&
        window.innerWidth >= MOBILE_BREAKPOINT
    );
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile, isTablet };
};

export default useMobileDetect;
