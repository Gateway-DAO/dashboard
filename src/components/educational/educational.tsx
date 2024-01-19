import { ReactNode } from 'react';

import { Box, Stack } from '@mui/material';

import EducationalTooltip from './components/educational-tooltip';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
  textBtn: string;
  open: boolean;
  onClose: () => void;
  href?: string;
  onClickCard?: () => void;
  position?: 'right' | 'bottom';
  alignX?: 'center' | 'left' | 'right';
  alignY?: 'top' | 'bottom';
};

export default function Educational({
  children,
  title,
  description,
  textBtn,
  open,
  onClose,
  href,
  onClickCard,
  position = 'right',
  alignX = 'right',
  alignY = 'bottom',
}: Props) {
  return (
    <Stack>
      <Stack sx={{ position: 'relative', zIndex: open ? 2 : 0 }}>
        {children}
        {open && (
          <EducationalTooltip
            title={title}
            description={description}
            textBtn={textBtn}
            onClickCard={onClickCard}
            href={href}
            onClose={onClose}
            position={position}
            alignX={alignX}
            alignY={alignY}
          />
        )}
      </Stack>
      {open && (
        <Box
          sx={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            backgroundColor: '#1b1b1b9e',
            left: 0,
            top: 0,
            zIndex: 1,
          }}
        />
      )}
    </Stack>
  );
}
