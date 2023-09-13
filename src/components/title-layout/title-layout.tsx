import { Typography } from '@mui/material';
import { Box } from '@mui/system';

type Props = {
  title: string;
  subtitle: string;
  titleId: string;
};

export default function TitleLayout({ title, subtitle, titleId }: Props) {
  return (
    <Box
      sx={{
        mb: {
          xs: 4,
          md: 5,
          lg: 6,
        },
      }}
    >
      <Typography variant="h3" id={titleId} sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {subtitle}
      </Typography>
    </Box>
  );
}
