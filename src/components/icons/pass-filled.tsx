import { SvgIcon, SvgIconProps } from '@mui/material';

export default function PassFilledIcon(props: SvgIconProps) {
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
        d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2Zm-5 7.226V16H9v-4.774C9 9.444 10.343 8 12 8s3 1.444 3 3.226Z"
      />
    </SvgIcon>
  );
}
