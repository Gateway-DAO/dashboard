import { SvgIcon, SvgIconProps } from '@mui/material';

export default function Education(props: SvgIconProps) {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 56 56"
      {...props}
    >
      <rect width={56} height={56} fill="#70ECFE" rx={14} />
      <g fill="#000" opacity={0.8}>
        <path d="M30.302 22.409c0-1.355 1.134-2.457 2.527-2.457h7.16L27.695 13.11a.857.857 0 00-.842 0L11.43 21.694a.81.81 0 00-.43.712c0 .295.16.565.43.713l15.423 8.599a.97.97 0 00.421.107.97.97 0 00.421-.107l12.29-6.852H32.83c-1.393 0-2.527-1.103-2.527-2.457z" />
        <path d="M51.348 36.787l-2.309-7.105v-7.273a.83.83 0 00-.842-.82H32.829a.83.83 0 00-.843.82.83.83 0 00.843.819h14.525v6.46l-2.357 7.246a.807.807 0 00.126.73.85.85 0 00.682.335h4.802a.833.833 0 00.842-.819.782.782 0 00-.101-.393z" />
        <path d="M15.539 27.109l9.943 5.92A3.968 3.968 0 0028.893 33l9.915-6.126v8.946c0 .436-.122.864-.353 1.237a2.427 2.427 0 01-.959.88l-9.167 4.773a2.454 2.454 0 01-2.313 0l-9.167-4.773a2.426 2.426 0 01-.959-.88 2.345 2.345 0 01-.352-1.237v-8.712z" />
      </g>
    </SvgIcon>
  );
}
