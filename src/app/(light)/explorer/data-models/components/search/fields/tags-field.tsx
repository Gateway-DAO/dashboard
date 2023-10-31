'use client';
import { useState } from 'react';

import { explorerDataModels } from '@/locale/en/datamodel';

import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import useMetadata from '../use-metadata';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// TODO: Handle massive amount of tags

export default function TagsField() {
  const [selectedTags, setTags] = useState<string[]>([]);
  const metadata = useMetadata();

  const handleChange = (event: SelectChangeEvent<typeof selectedTags>) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

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
        renderValue={(selectedTags) => selectedTags.join(', ')}
        MenuProps={MenuProps}
      >
        {metadata.data?.filteredDataModels.metadata.tags.map((tag) => (
          <MenuItem key={tag} value={tag}>
            <Checkbox checked={selectedTags.indexOf(tag) > -1} />
            <ListItemText primary={tag} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
