import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';

type Props = {
  margin?: number;
  marginTop?: number;
  size?: number;
  fullScreen?: boolean;
  loadingText?: string;
};

export default function Loading({
  margin,
  marginTop = 2,
  size = 40,
  fullScreen = false,
  loadingText,
}: Props): JSX.Element {
  return (
    <>
      {fullScreen ? (
        <Backdrop
          sx={{
            color: 'white',
            display: 'flex',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            flexDirection: 'column',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={true}
        >
          <CircularProgress color="inherit" />
          {loadingText && (
            <Typography fontWeight={700} mt={4}>
              {loadingText}
            </Typography>
          )}
        </Backdrop>
      ) : (
        <Box
          key="loading"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress
            size={size}
            sx={{ marginTop, margin: margin ? margin : null }}
          />
        </Box>
      )}
    </>
  );
}
