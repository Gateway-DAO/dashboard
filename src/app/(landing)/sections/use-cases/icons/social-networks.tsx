import { SvgIcon, SvgIconProps } from '@mui/material';

export default function SocialNetworks(props: SvgIconProps) {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 56 56"
      {...props}
    >
      <rect width={56} height={56} fill="#70ECFE" rx={14} />
      <path
        fill="#000"
        d="M40.419 15h-22.82C14.509 15 12 17.582 12 20.764V40h28.401C43.491 40 46 37.418 46 34.236V20.764C46 17.582 43.51 15 40.419 15zm-11.41 18.71s-7.118-3.82-7.118-8.583c0-2.072 1.696-3.818 3.727-3.818 2.384 0 3.409 1.745 3.409 1.745s1.006-1.745 3.408-1.745c2.032 0 3.727 1.745 3.727 3.818-.035 4.764-7.153 8.582-7.153 8.582z"
        opacity={0.8}
      />
    </SvgIcon>
  );
}
