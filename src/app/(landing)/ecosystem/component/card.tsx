import Image from 'next/image';

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
};

export const Card = (props: Props) => {
  return (
    <Stack component={Paper}>
      <CardContent>
        <Image
          src={`/ecosystem-card-images/${props.img}.png`}
          style={{

            objectFit: 'contain',
          }}
          height={30}
          width={100}
          alt={`/ecosystem-card-images/${props.img}.png`}
        />
        <Box marginTop={10}>
          <Typography variant="subtitle1" gutterBottom>
            {props.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {props.description}
          </Typography>
          <Stack direction="row" gap={2} mt={2}>
            {props.tags.map((tag) => (
              <Chip key={tag} label={tag} variant="outlined" />
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Stack>
  );
};
