import { SvgIcon, SvgIconProps } from '@mui/material';

export default function ImageIcon(props: SvgIconProps) {
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
        fill="#E53935"
        fillRule="evenodd"
        d="M6.01 2h7.16c.53 0 1.04.21 1.41.59l4.83 4.83c.38.37.59.88.59 1.41V20c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2l.01-16a2 2 0 012-2zM13 3.5V8c0 .55.45 1 1 1h4.5L13 3.5zM16.443 18H7.557c-.455 0-.722-.507-.444-.863l1.533-1.973a.561.561 0 01.888 0l1.355 1.758 2.466-3.204a.561.561 0 01.889 0l2.643 3.42c.278.355.011.862-.444.862z"
        clipRule="evenodd"
      />
    </SvgIcon>
  );
}
