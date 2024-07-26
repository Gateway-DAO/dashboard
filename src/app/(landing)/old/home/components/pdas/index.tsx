'use client';
import useMobileDetect from '@/app/(landing)/old/hooks/use-mobile.detect';

import PDAsDesktop from './desktop';
import PDAsMobile from './mobile';

export default function Pdas() {
  const { isMobile, isTablet } = useMobileDetect();

  return isMobile || isTablet ? <PDAsMobile /> : <PDAsDesktop />;
}
