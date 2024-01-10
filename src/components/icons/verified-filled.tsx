import { SvgIcon, SvgIconProps } from '@mui/material';

export default function VerifiedFilledIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.56 9.2 23 11.99l-2.44 2.8.34 3.69-3.61.82-1.89 3.19-3.4-1.46-3.4 1.47-1.89-3.2-3.61-.82.34-3.7L1 11.99 3.44 9.2 3.1 5.5l3.61-.81L8.6 1.5 12 2.96l3.4-1.46 1.89 3.19 3.61.82-.34 3.69ZM7.77 11.42l2.32 2.33 5.86-5.88 1.48 1.49-7.34 7.36-3.8-3.81 1.48-1.49Z"
      />
    </SvgIcon>
  );
}
