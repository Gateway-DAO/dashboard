import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ReactNode, MouseEvent } from 'react';

import gsap from 'gsap';

import LenisManager from '../../utils/scroll';

type Props = {
  children: ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
};

export default function Link({ href, children, className, onClick }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();

    if (onClick) onClick();

    if (pathname === href) return;

    const tl = gsap.timeline();
    tl.to('main', { opacity: 0, duration: 0.3 });
    tl.add(() => {
      LenisManager?.scrollTo(0, { duration: 0.01 });
      router.push(href);
    });
  };

  return (
    <NextLink className={className} href={href} onClick={handleClick}>
      {children}
    </NextLink>
  );
}
