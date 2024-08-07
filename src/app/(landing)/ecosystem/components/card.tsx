import Image from 'next/image';
import Link from 'next/link';

import {
  Box,
  Card,
  CardActionArea,
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
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
      >
        <Box
          sx={{
            height: 24,
            position: 'relative',
            width: '100%',
          }}
        >
          <Image
            src={`/images/ecosystem/${logo}`}
            style={{
              objectFit: 'contain',
              objectPosition: 'left center',
            }}
            alt={name}
            fill
          />
        </Box>
        <Stack
          marginTop={10}
          sx={{
            flexGrow: 1,
          }}
        >
          <Typography variant="subtitle1">{name}</Typography>
          <Typography variant="body1" fontWeight={300}>
            {description}
          </Typography>
          <Stack
            direction="row"
            gap={1}
            mt={2}
            sx={{ flexGrow: 1, alignItems: 'flex-end' }}
          >
            {tags.map((tag) => (
              <Chip key={tag} label={tag} variant="outlined" />
            ))}
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
