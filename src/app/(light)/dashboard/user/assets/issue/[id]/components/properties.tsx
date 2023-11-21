import { Stack } from '@mui/material';

import Property from './property';

type Props = {
  schema: any;
};

export default function Properties({ schema }: Props) {
  const properties = schema.properties;
  const keys = Object.keys(properties);
  const isRequired = (key: string) => schema.required?.includes(key) ?? false;
  return (
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
  );
}
