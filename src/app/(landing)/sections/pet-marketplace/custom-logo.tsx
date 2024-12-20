import { useTheme, useMediaQuery } from '@mui/material';

interface CustomLogoProps {
  color?: string;
  size?: number | { xs?: number; sm?: number; md?: number; lg?: number };
}

export const CustomLogo: React.FC<CustomLogoProps> = ({
  color = '#F6F4FA',
  size = { xs: 32, sm: 38, md: 42, lg: 46 },
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));

  const getLogoSize = () => {
    if (typeof size === 'number') return size;

    if (isMobile && size.xs) return size.xs;
    if (isTablet && size.sm) return size.sm;
    if (isLaptop && size.md) return size.md;
    return size.lg || 42; // default to lg size or 42
  };

  const logoSize = getLogoSize();

  return (
    <svg
      width={logoSize}
      height={logoSize}
      viewBox="0 0 68 68"
      fill="none"
      style={{
        transition: theme.transitions.create(['width', 'height'], {
          duration: theme.transitions.duration.standard,
        }),
      }}
    >
      <path
        d="M32.6883 0C28.3956 0 24.1449 0.853563 20.179 2.51195C16.2131 4.17034 12.6096 6.60109 9.57418 9.66539C6.53879 12.7297 4.13099 16.3676 2.48825 20.3713C0.845507 24.375 0 28.6661 0 32.9997C0 37.3333 0.845508 41.6245 2.48825 45.6282C4.13099 49.6319 6.53879 53.2697 9.57418 56.334C12.6096 59.3983 16.2131 61.8291 20.179 63.4875C24.1449 65.1459 28.3956 65.9994 32.6883 65.9994L32.6883 0Z"
        fill={color}
      />
      <path
        d="M37.6702 0H39.8494C54.292 2.16187e-05 66 11.8196 66 26.3998L37.6702 0Z"
        fill={color}
      />
      <path
        d="M66 42.452V66H37.6702V42.452C37.6702 34.8019 44.012 28.6003 51.8351 28.6003C59.6581 28.6003 66 34.8019 66 42.452Z"
        fill={color}
      />
    </svg>
  );
};
