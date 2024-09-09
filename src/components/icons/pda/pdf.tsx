import { SvgIcon, SvgIconProps } from '@mui/material';

export default function PDFIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="#E53935" d="M7 14.5h1v-1H7v1zm5 2h1v-3h-1v3z" />
      <path
        fill="#E53935"
        fillRule="evenodd"
        d="M6.01 2h7.16c.53 0 1.04.21 1.41.59l4.83 4.83c.38.37.59.88.59 1.41V20c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2l.01-16a2 2 0 012-2zM13 3.5V8c0 .55.45 1 1 1h4.5L13 3.5zM8 16c.83 0 1.5-.67 1.5-1.5v-1c0-.83-.67-1.5-1.5-1.5H6.5c-.55 0-1 .45-1 1v4.25c0 .41.34.75.75.75s.75-.34.75-.75V16h1zm5 2c.83 0 1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5h-2c-.28 0-.5.22-.5.5v5c0 .28.22.5.5.5h2zm4.75-4.5c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H16.5c-.55 0-1 .45-1 1v4.25c0 .41.34.75.75.75s.75-.34.75-.75V16h.75c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H17v-1h.75z"
        clipRule="evenodd"
      />
    </SvgIcon>
  );
}
