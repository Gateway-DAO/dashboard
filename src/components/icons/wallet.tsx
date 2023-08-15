import { SvgIcon, SvgIconProps } from '@mui/material';

export function WalletIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.33329 5.33334H26.6666C28.1466 5.33334 29.3333 6.52001 29.3333 8.00001V24C29.3333 25.48 28.1466 26.6667 26.6666 26.6667H5.33329C3.85329 26.6667 2.66663 25.48 2.66663 24L2.67996 8.00001C2.67996 6.52001 3.85329 5.33334 5.33329 5.33334ZM8.66663 9.33334C7.56206 9.33334 6.66663 10.2288 6.66663 11.3333C6.66663 12.4379 7.56206 13.3333 8.66663 13.3333H16.6666C17.7712 13.3333 18.6666 12.4379 18.6666 11.3333C18.6666 10.2288 17.7712 9.33334 16.6666 9.33334H8.66663Z"
      />
    </SvgIcon>
  );
}
