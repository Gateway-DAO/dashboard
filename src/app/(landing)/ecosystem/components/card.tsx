import Image from 'next/image';
import Link from 'next/link';

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';

import clients from '../data.json';

export default function ClientCard({
  logo,
  name,
  description,
  tags,
  url,
}: (typeof clients)[0]) {
  return (
    <Card variant="outlined">
      <CardActionArea
        component={Link}
        href={url}
        target="_blank"
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          py: 3.5,
          px: 2,
        }}
      >
        <Box
          sx={{
            height: 24,
            position: 'relative',
          }}
        >
          <Image
            src={`/images/ecosystem/${logo}.svg`}
            style={{
              objectFit: 'contain',
              objectPosition: 'left center',
            }}
            alt={name}
            fill
          />
        </Box>
        <Box marginTop={10}>
          <Typography variant="subtitle1">{name}</Typography>
          <Typography variant="body1" fontWeight={300}>
            {description}
          </Typography>
          <Stack direction="row" gap={1} mt={2}>
            {tags.map((tag) => (
              <Chip key={tag} label={tag} variant="outlined" />
            ))}
          </Stack>
        </Box>
      </CardActionArea>
    </Card>
  );
}
