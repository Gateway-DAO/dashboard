import { SvgIcon, SvgIconProps } from '@mui/material';

export function SquaredArrowRight(props: SvgIconProps) {
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
      <path d="M15.8932 14.2233L11.8397 14.2234L11.8397 11.7234L20.1607 11.7233L20.1608 20.0444L17.6608 20.0445L17.6607 15.9913L12.7236 20.9285L10.9558 19.1607L15.8932 14.2233Z" />
    </SvgIcon>
  );
}
