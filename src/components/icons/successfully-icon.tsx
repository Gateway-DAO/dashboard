import { Box, SxProps } from '@mui/material';

type Props = {
  size?: 'large' | 'small';
  sx?: SxProps;
};

export function SuccessfullyIcon({ size = 'large', sx }: Props) {
  return (
    <Box sx={{ width: '40px', height: '40px', ...sx }}>
      {size === 'large' && (
        <svg
          width="100%"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="20" fill="#CDDA05" />
          <path
            d="M16.7951 23.8769L12.6251 19.7069L11.2051 21.1169L16.7951 26.7069L28.7951 14.7069L27.3851 13.2969L16.7951 23.8769Z"
            fill="#2D2237"
          />
        </svg>
      )}
      {size === 'small' && (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.9998 0.666016C6.63984 0.666016 0.666504 6.63935 0.666504 13.9993C0.666504 21.3594 6.63984 27.3327 13.9998 27.3327C21.3598 27.3327 27.3332 21.3594 27.3332 13.9993C27.3332 6.63935 21.3598 0.666016 13.9998 0.666016ZM11.3332 20.666L4.6665 13.9993L6.5465 12.1193L11.3332 16.8927L21.4532 6.77268L23.3332 8.66602L11.3332 20.666Z"
            fill="#6DFFB9"
          />
        </svg>
      )}
    </Box>
  );
}
