import { SvgIcon, SvgIconProps } from '@mui/material';

export default function LoyaltyProgram(props: SvgIconProps) {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 56 56"
      {...props}
    >
      <rect width={56} height={56} fill="#70ECFE" rx={14} />
      <g fill="#000" opacity={0.8}>
        <path d="M28.636 13.905a1.75 1.75 0 012.02-1.43 15.75 15.75 0 0112.923 13.21 1.75 1.75 0 01-3.462.515 12.25 12.25 0 00-10.051-10.275 1.75 1.75 0 01-1.43-2.02zm-2.187.072a1.75 1.75 0 01-1.296 2.108 12.25 12.25 0 1014.694 15.031 1.75 1.75 0 013.385.89A15.75 15.75 0 1124.34 12.681a1.75 1.75 0 012.109 1.296z" />
        <path
          fillRule="evenodd"
          d="M28 21c3.856 0 7 3.107 7 7 0 3.856-3.144 7-7 7a6.99 6.99 0 01-7-7c0-3.856 3.107-7 7-7zm-2.695 9.845a.563.563 0 00.823.599l1.647-.973a.28.28 0 01.337 0l1.685.973c.412.224.936-.15.823-.6l-.374-1.908c0-.113.037-.225.112-.3l1.46-1.31c.375-.3.15-.898-.3-.936l-1.946-.224a.281.281 0 01-.262-.187l-.823-1.797c-.225-.412-.824-.412-1.011 0l-.824 1.797a.281.281 0 01-.262.187l-1.946.224c-.45.038-.636.637-.3.936l1.423 1.31c.112.075.15.188.112.3l-.374 1.909z"
          clipRule="evenodd"
        />
      </g>
    </SvgIcon>
  );
}
