import { SvgIcon, SvgIconProps } from '@mui/material';

export default function DataOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M13.17 2c.53 0 1.04.21 1.42.59l4.82 4.83c.38.37.59.88.59 1.41V20c0 1.1-.9 2-2 2H5.99C4.89 22 4 21.1 4 20V4c0-1.1.9-2 2-2h7.17zM13 3.5V8c0 .55.45 1 1 1h4.5L13 3.5zm-7 12a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zm7 2.5h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1zm4-3h-4c-.55 0-1-.45-1-1s.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1z"
        clipRule="evenodd"
      />
    </SvgIcon>
  );
}
