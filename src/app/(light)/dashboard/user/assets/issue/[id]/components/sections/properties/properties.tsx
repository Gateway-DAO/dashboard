import { common } from '@/locale/en/common';
import { issuePdaForm } from '@/locale/en/pda';

import { Box, Paper, Stack, Typography } from '@mui/material';

import Property from './property';

type Props = {
  schema: any;
};

export default function PropertiesSection({ schema }: Props) {
  const properties = schema.properties;
  const keys = Object.keys(properties);
  const isRequired = (key: string) => schema.required?.includes(key) ?? false;

  return (
    <Paper
      component={Stack}
      elevation={0}
      sx={{ p: 3, border: 1, borderColor: 'divider' }}
      gap={4}
    >
      <Box>
        <Typography variant="h5">{common.general.claim}</Typography>
        <Typography variant="body2" color="text.secondary">
          {issuePdaForm.claim.description}
        </Typography>
      </Box>
      <Stack gap={3}>
        {keys.map((key) => (
          <Property
            key={key}
            id={key}
            property={properties[key]}
            required={isRequired(key)}
          />
        ))}
      </Stack>
    </Paper>
  );
}
