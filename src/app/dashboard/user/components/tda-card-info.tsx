import useTranslation from 'next-translate/useTranslation';

import { theme } from '@/theme';

import { Stack, Paper, Box, Divider, Chip, useMediaQuery } from '@mui/material';

import CardCell from './card-cell';
import { limitCharsCentered } from '@/utils/string';
import CopyPaste from '@/components/copy-paste/copy-paste';

type Props = {
  credential?: any;
};

export default function TdaCardInfo({ credential }: Props) {
  return (
    <Stack
      sx={{
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 2,
        mb: 3,
        overflow: 'hidden',
        boxShadow: 'none',
        maxWidth: 550,
      }}
      divider={<Divider sx={{ width: '100%' }} />}
    >
      <Stack
        alignItems="stretch"
        justifyContent="space-around"
        sx={{
          flexDirection: 'column',
        }}
        divider={
          <Box>
            <Divider />
          </Box>
        }
      >
        <CardCell label="Share date">08/05/22, 11:45 am</CardCell>
        <CardCell label="Data Proof ID">
          <CopyPaste
            text={limitCharsCentered(
              '7Cae5130c16e6c8b686440b900d93fe1291977e70b812d170024f1cffd0e3fe375',
              8
            )}
          />
        </CardCell>
        <CardCell label="Share date">
          <Chip
            label="08/05/22, 11:45 am"
            size="small"
            variant="outlined"
            color="warning"
          />
        </CardCell>
      </Stack>
      <Stack
        alignItems="stretch"
        justifyContent="space-around"
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
        }}
        divider={
          <Box>
            <Divider
              sx={{
                flexDirection: { xs: 'column', md: 'row' },
              }}
            />
          </Box>
        }
      >
        {credential?.title}
      </Stack>
    </Stack>
  );
}
