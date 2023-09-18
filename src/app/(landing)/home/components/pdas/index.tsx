'use client';
import useMobileDetect from '@/app/(landing)/hooks/use-mobile.detect';

import PDAsDesktop from './desktop';
import PDAsMobile from './mobile';

export default function Pdas() {
  const { isMobile } = useMobileDetect();

  return isMobile ? <PDAsMobile /> : <PDAsDesktop />;
}
