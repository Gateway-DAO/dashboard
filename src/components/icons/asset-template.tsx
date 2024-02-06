import { SvgIcon, SvgIconProps } from '@mui/material';

export default function AssetTemplateImage(props: SvgIconProps) {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="220"
      height="146"
      viewBox="0 0 220 146"
      fill="none"
      {...props}
    >
      <rect width="220" height="146" rx="8" fill="#771AC9" fillOpacity="0.08" />
      <circle
        opacity="0.4"
        cx="27"
        cy="30"
        r="14"
        fill="#771AC9"
        fillOpacity="0.3"
      />
      <rect
        opacity="0.4"
        x="52"
        y="24"
        width="74"
        height="11"
        rx="5.5"
        fill="#771AC9"
        fillOpacity="0.3"
      />
      <rect
        opacity="0.4"
        x="13"
        y="80"
        width="187"
        height="21"
        rx="8"
        fill="#771AC9"
        fillOpacity="0.3"
      />
      <rect
        opacity="0.4"
        x="13"
        y="109"
        width="39"
        height="17"
        rx="8"
        fill="#771AC9"
        fillOpacity="0.3"
      />
    </SvgIcon>
  );
}
