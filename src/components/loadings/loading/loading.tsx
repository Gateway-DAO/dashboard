import { Backdrop, Box, CircularProgress } from '@mui/material';

type Props = {
  margin?: number;
  marginTop?: number;
  size?: number;
  fullScreen?: boolean;
};

export default function Loading({
  margin,
  marginTop = 2,
  size = 40,
  fullScreen = false,
}: Props): JSX.Element {
  return (
    <>
      {fullScreen ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
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
