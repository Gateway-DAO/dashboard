import { Box, Divider, Stack, Typography } from '@mui/material';

const investors = [
  {
    id: '',
    name: 'Reciprocal Ventures',
  },
];

const investorsNames = [
  'Sandeep Nailwal',
  'David Gan',
  'David Sneider and Chris Wiggum',
  'Ryan Selkis',
  'Stepan Simkin',
  'Ryan Li',
];

export default function Investors() {
  return (
    <Stack
      sx={{
        border: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        borderRadius: 1,
      }}
    >
      <Stack
        sx={{
          p: 3,
          pb: 6,
          color: 'white.main',
        }}
      >
        <Typography color="inherit" variant="subtitle1" mb={5}>
          Investors
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px 132px',
          }}
        >
          <Typography color="inherit">Investor Relations</Typography>
        </Box>
      </Stack>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px 132px',
          px: 3,
          py: 4,
          color: 'white.main',
        }}
      >
        {investorsNames.map((name) => (
          <Typography
            key={name}
            color="inherit"
            textAlign="center"
            variant="body2"
          >
            {name}
          </Typography>
        ))}
      </Box>
    </Stack>
  );
}
