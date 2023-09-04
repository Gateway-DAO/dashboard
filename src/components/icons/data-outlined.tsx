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
      <path fill="currentColor" d="M5 8.5A1.5 1.5 0 0 1 6.5 7h6a1.5 1.5 0 0 1 0 3h-6A1.5 1.5 0 0 1 5 8.5Z" />
      <path fill="currentColor" fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm0 2h16v12H4V6Z" clip-rule="evenodd" />

    </SvgIcon>
  );
}
