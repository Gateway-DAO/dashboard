import { SvgIcon, SvgIconProps } from '@mui/material';

export default function ScanIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="current"
        d="M14 20a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-2a1 1 0 1 1 2 0v2a4 4 0 0 1-4 4h-2a1 1 0 0 1-1-1ZM4 14a1 1 0 0 1 1 1v2a2 2 0 0 0 2 2h2a1 1 0 1 1 0 2H7a4 4 0 0 1-4-4v-2a1 1 0 0 1 1-1ZM10 4a1 1 0 0 1-1 1H7a2 2 0 0 0-2 2v2a1 1 0 0 1-2 0V7a4 4 0 0 1 4-4h2a1 1 0 0 1 1 1ZM14 4a1 1 0 0 0 1 1h2a2 2 0 0 1 2 2v2a1 1 0 1 0 2 0V7a4 4 0 0 0-4-4h-2a1 1 0 0 0-1 1Z"
      />
    </SvgIcon>
  );
}
