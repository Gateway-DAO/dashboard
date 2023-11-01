'use client';
import { useState } from 'react';

import { explorerDataModels } from '@/locale/en/datamodel';
import { FixedSizeList } from 'react-window';
import { PartialDeep } from 'type-fest';

import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  MenuProps,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import useMetadata from '../use-metadata';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
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

  const handleChange = (event: SelectChangeEvent<typeof selectedTags>) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value ?? []
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
        MenuProps={menuProps}
      >
        <FixedSizeList
          height={ITEM_HEIGHT * 4.5}
          itemCount={tags.length ?? 0}
          itemSize={ITEM_HEIGHT}
          itemData={tags ?? []}
          width={menuProps.PaperProps.style.width}
        >
          {({ data, index, style }) => {
            const tag = data[index];
            return (
              <MenuItem key={tag} value={tag} style={style}>
                <Checkbox
                  checked={
                    selectedTags ? selectedTags.indexOf(tag) > -1 : false
                  }
                />
                <ListItemText primary={tag} />
              </MenuItem>
            );
          }}
        </FixedSizeList>
      </Select>
    </FormControl>
  );
}
