import { SvgIcon, SvgIconProps } from '@mui/material';

export default function IssuanceIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="currentColor"
        d="M11.6 3A6.6 6.6 0 0 0 5 9.6v3.3a6.6 6.6 0 0 0 6.6 6.6h6.486l-.793.793a1 1 0 0 0 1.414 1.414l2.5-2.5a1 1 0 0 0 0-1.414l-2.5-2.5a1 1 0 0 0-1.414 1.414l.793.793H11.6A4.6 4.6 0 0 1 7 12.9V9.6A4.6 4.6 0 0 1 11.6 5h.8A4.6 4.6 0 0 1 17 9.6v2a1 1 0 1 0 2 0v-2A6.6 6.6 0 0 0 12.4 3h-.8Z"
      />
      <path
        fill="currentColor"
        d="M11 10a1 1 0 1 1 2 0v2.5a1 1 0 1 1-2 0V10Z"
      />
      <path
        fill="currentColor"
        d="M10 9.8A1.8 1.8 0 0 1 11.8 8h.4A1.8 1.8 0 0 1 14 9.8v2.9a1.8 1.8 0 0 1-1.8 1.8h-.7A1.5 1.5 0 0 1 10 13a1 1 0 1 0-2 0 3.5 3.5 0 0 0 3.5 3.5h.7a3.8 3.8 0 0 0 3.8-3.8V9.8A3.8 3.8 0 0 0 12.2 6h-.4A3.8 3.8 0 0 0 8 9.8v.2a1 1 0 1 0 2 0v-.2Z"
      />
    </SvgIcon>
  );
}
