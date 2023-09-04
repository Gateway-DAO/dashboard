import { brandColors } from '@/theme/config/brand';

import { SvgIcon, SvgIconProps } from '@mui/material';

export default function GatewaySquaredIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      sx={{
        color: brandColors.primary,
        ...props.sx,
      }}
    >
      <path
        d="M0 9.7561C0 4.36795 4.36795 0 9.7561 0H30.2439C35.632 0 40 4.36795 40 9.7561V30.2439C40 35.632 35.632 40 30.2439 40H9.7561C4.36795 40 0 35.632 0 30.2439V9.7561Z"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path
        d="M19.9123 10.7314C18.7067 10.7314 17.5128 10.9649 16.3989 11.4184C15.2851 11.8719 14.273 12.5366 13.4205 13.3746C12.5679 14.2126 11.8917 15.2075 11.4303 16.3023C10.9689 17.3972 10.7314 18.5707 10.7314 19.7558C10.7314 20.9409 10.9689 22.1144 11.4303 23.2093C11.8917 24.3042 12.5679 25.299 13.4205 26.137C14.273 26.975 15.2851 27.6398 16.3989 28.0933C17.5128 28.5468 18.7067 28.7802 19.9123 28.7802L19.9123 10.7314Z"
        fill="currentColor"
      />
      <path
        d="M21.3115 10.7314H21.9236C25.98 10.7315 29.2683 13.9637 29.2683 17.951L21.3115 10.7314Z"
        fill="currentColor"
      />
      <path
        d="M29.2683 22.3407V28.7804H21.3115V22.3407C21.3115 20.2487 23.0927 18.5527 25.2899 18.5527C27.4871 18.5527 29.2683 20.2487 29.2683 22.3407Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}
