import { SvgIcon, SvgIconProps } from '@mui/material';

export function SquaredArrowDown(props: SvgIconProps) {
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
        d="M5.33329 5.33333C3.86053 5.33333 2.66663 6.52724 2.66663 8V24C2.66663 25.4728 3.86053 26.6667 5.33329 26.6667H26.6666C28.1394 26.6667 29.3333 25.4728 29.3333 24V7.99999C29.3333 6.52723 28.1394 5.33333 26.6666 5.33333H5.33329ZM5.33329 8L26.6666 7.99999V24H5.33329V8Z"
      />
      <path d="M17.25 16.9825L20.1162 14.1162L21.884 15.884L16.0002 21.7679L10.1162 15.884L11.884 14.1162L14.75 16.9822L14.75 10H17.25L17.25 16.9825Z" />
    </SvgIcon>
  );
}
