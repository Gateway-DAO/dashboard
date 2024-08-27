'use client';

import { useCallback } from 'react';

import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';

const menuProps = {
  PaperProps: {
    style: {
      width: 250,
    },
  },
  MenuListProps: {
    style: {
      padding: 0,
    },
  },
};

type Props = {
  tags: string[];
  selectedTags?: string[];
  isLoading?: boolean;
  setTags: (tags: string[]) => void;
};

export default function TagsField({
  tags,
  setTags,
  isLoading,
  selectedTags,
}: Props) {
  const handleChange = useCallback(
    (event: SelectChangeEvent<typeof selectedTags>) => {
      const {
        target: { value },
      } = event;

      setTags(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value ?? []
      );
    },
    []
  );

  return (
    <FormControl
      fullWidth
      sx={{
        maxWidth: {
          xs: 'unset',
          lg: 200,
        },
      }}
    >
      <InputLabel id="tags-label">{'Tags'}</InputLabel>
      <Select
        labelId="tags-label"
        id="tags"
        multiple
        value={selectedTags}
        onChange={handleChange}
        input={<OutlinedInput id="tags-chip" label="Tags" />}
        renderValue={() =>
          (selectedTags || [])?.length > 0
            ? `${(selectedTags || []).length} selected`
            : undefined
        }
        MenuProps={menuProps}
        disabled={isLoading}
      >
        {tags.map((tag) => (
          <MenuItem key={tag} value={tag}>
            <Checkbox
              checked={selectedTags ? selectedTags.indexOf(tag) > -1 : false}
            />
            <ListItemText primary={tag} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
