import { SvgIcon, SvgIconProps } from '@mui/material';

export default function DataMigrationIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      width="73"
      height="40"
      fill="none"
      viewBox="0 0 73 40"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        width="35.855"
        height="35.855"
        fill="#F5B5FF"
        opacity=".3"
        rx="4.643"
      />
      <rect
        width="35.855"
        height="35.855"
        x="37.145"
        fill="#771AC9"
        rx="4.643"
      />
      <rect
        width="34"
        height="12"
        x="12"
        y="12"
        fill="#771AC9"
        opacity=".2"
        rx="6"
      />
      <circle cx="18" cy="18" r="6" fill="#771AC9" opacity=".2" />
      <path fill="#fff" d="M37 12h18a6 6 0 0 1 0 12H37V12Z" opacity=".2" />
      <circle cx="55" cy="18" r="6" fill="#fff" />
    </SvgIcon>
  );
}
