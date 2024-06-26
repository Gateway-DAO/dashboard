import Image from 'next/image';
import Link from 'next/link';

import {
  Box,
  CardContent,
  Chip,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

type Props = {
  img: string;
  name: string;
  description: string;
  tags: string[];
  url: string;
};

export const Card = (props: Props) => {
  return (
    <Stack
      sx={{
        ':hover': { boxShadow: '6px 8px 20px rgba(119, 26, 201, 0.1)' },
        borderRadius: '16px',
        padding: '1px',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        background: '#fff',
      }}
    >
      <CardContent
        component={Link}
        href={props.url}
        target="_blank"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Image
          src={`/ecosystem-card-images/${props.img}.svg`}
          style={{
            objectFit: 'contain',
          }}
          height={30}
          width={100}
          alt={`/ecosystem-card-images/${props.img}.svg`}
        />
        <Box marginTop={10}>
          <Typography variant="subtitle1">{props.name}</Typography>
          <Typography variant="body1" fontWeight={300}>
            {props.description}
          </Typography>
          <Stack direction="row" gap={1} mt={2}>
            {props.tags.map((tag) => (
              <Chip key={tag} label={tag} variant="outlined" />
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Stack>
  );
};
