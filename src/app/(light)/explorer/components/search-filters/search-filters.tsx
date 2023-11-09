import { PropsWithChildren } from 'react';

import useBreakpoints from '@/hooks/use-breakpoints';
import { useToggle } from '@react-hookz/web';

import { FilterListOutlined } from '@mui/icons-material';
import { Collapse, IconButton } from '@mui/material';
import { Stack } from '@mui/system';

import SearchField from './search-field';

type Props = {
  onSearch: (value: string) => void;
};

export default function SearchFilters({
  children,
  onSearch,
}: PropsWithChildren<Props>) {
  const [isVisible, toggleVisible] = useToggle(false);

  const { isDesktop } = useBreakpoints();

  return (
    <Stack mb={2} direction="column" gap={2} justifyContent="stretch">
      <Stack flexDirection="row" gap={1}>
        <SearchField onChange={onSearch} />
        {children && (
          <IconButton
            type="button"
            onClick={toggleVisible}
            sx={{
              display: {
                xs: 'block',
                lg: 'none',
              },
              border: 1,
              px: 2,
              borderRadius: 1,
            }}
          >
            <FilterListOutlined />
          </IconButton>
        )}
      </Stack>
      {children && (
        <Collapse in={isDesktop || isVisible}>
          <Stack
            flexDirection={{
              xs: 'column',
              lg: 'row',
            }}
            alignItems={{
              xs: 'stretch',
              lg: 'flex-start',
            }}
            gap={1}
          >
            {children}
          </Stack>
        </Collapse>
      )}
    </Stack>
  );
}
