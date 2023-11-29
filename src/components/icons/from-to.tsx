import { SvgIcon, SvgIconProps } from '@mui/material';

export default function FromToIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="36"
      viewBox="0 0 19 36"
      fill="none"
      {...props}
    >
      <path
        d="M1 1L18 18L1 35"
        stroke="black"
        strokeOpacity="0.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}
