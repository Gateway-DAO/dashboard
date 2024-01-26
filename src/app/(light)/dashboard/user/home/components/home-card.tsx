'use client';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button, Paper, Typography, Link } from '@mui/material';

import GetIcon from './get-icon';

type Props = {
  heading: string;
  title: string;
  subtitle: string;
  link: string;
  btn_text: string;
  target: string;
  index: number;
};

export default function HomeCard({
  heading,
  title,
  subtitle,
  link,
  btn_text,
  target,
  index,
}: Props) {
  return (
    <Paper
      component={Link}
      href={link}
      target={target}
      variant="outlined"
      sx={{
        padding: 2,
        paddingLeft: 2,
        width: '100%',
        height: 296,
        marginTop: 2,
        mr: 1,
        textDecoration: 'none',
        '&:last-child': { mr: 0 },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <GetIcon index={index} sx={{ width: 60, height: 50, mb: 1.5 }} />
      <Typography variant="body2" color="text.secondary">
        {heading}
      </Typography>
      <Typography mt={1} variant="h5" width={250} gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="body2"
        width={300}
        gutterBottom
        sx={{ mb: 2, flexGrow: 1 }}
      >
        {subtitle}
      </Typography>
      <Button variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
        {btn_text}
        {target === '_blank' && (
          <OpenInNewIcon sx={{ ml: 0.8, height: 18, width: 18 }} />
        )}
      </Button>
    </Paper>
  );
}
