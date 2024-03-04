import Link from 'next/link';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button, Paper, Typography, Box } from '@mui/material';

import { HomeCardProps } from './types';

export default function HomeCard({
  icon: Icon,
  iconStyle,
  heading,
  title,
  subtitle,
  link,
  btn_text,
  target,
}: HomeCardProps) {
  return (
    <Paper
      component={Link}
      href={link}
      target={target}
      variant="outlined"
      sx={{
        padding: 2,
        width: '100%',
        textDecoration: 'none',
        '&:last-child': { mr: 0 },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Icon
        sx={{
          width: 40,
          height: 40,
          mb: 11,
          ...iconStyle,
        }}
      />

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {heading}
        </Typography>
        <Typography mt={1} variant="h5" gutterBottom whiteSpace="pre">
          {title}
        </Typography>
        <Typography
          variant="body2"
          width={300}
          gutterBottom
          sx={{ flexGrow: 1 }}
        >
          {subtitle}
        </Typography>
      </Box>
      <Button
        component="span"
        variant="outlined"
        size="small"
        sx={{ alignSelf: 'flex-start', mt: 'auto' }}
      >
        {btn_text}
        {target === '_blank' && (
          <OpenInNewIcon sx={{ ml: 0.8, height: 18, width: 18 }} />
        )}
      </Button>
    </Paper>
  );
}
