import { SvgIcon, SvgIconProps } from '@mui/material';

export default function DataRequestFilledIcon(props: SvgIconProps) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm13.087 4.587-2.15 2.15V7.5h-1.874v5.237l-2.15-2.15-1.326 1.326L12 16.326l4.413-4.413-1.326-1.326Z" fill="currentColor"
      />
    </SvgIcon>
  );
}
