import { Box, Card, Skeleton, Typography } from '@mui/material';

type Props = {
  showTag?: boolean;
};

export default function BlogCardLoading({ showTag = true }: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        p: 3,
        height: '100%',
        flex: 1,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          inset: 0,
          aspectRatio: 373 / 211,
          width: '100%',
          mb: 3,
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <Skeleton variant="rectangular" sx={{ height: '100%' }} />
      </Box>
      {showTag && <Skeleton variant="rounded" sx={{ mb: 2, width: 80 }} />}
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        sx={{ mb: 1, width: '100%' }}
      >
        <Skeleton variant="text" />
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ width: 100 }}>
        <Skeleton variant="text" />
      </Typography>
    </Card>
  );
}
