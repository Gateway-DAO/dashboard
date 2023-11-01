'use client';

import { useCallback } from 'react';

import { explorerDataModels } from '@/locale/en/datamodel';

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

import useMetadata from '../use-metadata';

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
  selectedTags?: string[];
  setTags: (tags: string[]) => void;
};

export default function TagsField({ setTags, selectedTags }: Props) {
  const metadata = useMetadata();
  const tags = metadata.data?.dataModelsMetadata.tags ?? [];

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
      <InputLabel id="tags-label">{explorerDataModels.filters.tags}</InputLabel>
      <Select
        labelId="tags-label"
        id="tags"
        multiple
        value={selectedTags}
        onChange={handleChange}
        input={<OutlinedInput id="tags-chip" label="Tags" />}
        renderValue={(value) => value.join(', ')}
        MenuProps={menuProps}
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
