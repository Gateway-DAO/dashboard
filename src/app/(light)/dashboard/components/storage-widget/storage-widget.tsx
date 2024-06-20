'use client';

import { useSession } from 'next-auth/react';

import { convertBytes, formatBytes } from '@/utils/bytes';
import { useToggle } from '@react-hookz/web';

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  alpha,
} from '@mui/material';

import StorageModal from './storage-modal';
import { MAX_FILE_USER_STORAGE } from '@/constants/file-upload';

export default function StorageWidget() {
  const [isOpen, toggle] = useToggle();
  const session = useSession();

  return (
    <>
      <Box
        sx={(theme) => ({
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.focusOpacity
          ),
          borderRadius: theme.shape.borderRadius / 16, //Strange issue with MUI
          p: 2,
          textAlign: 'left',
        })}
      >
        <Stack direction="row" gap={2}>
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <CircularProgress
              {...(session.status === 'authenticated' && {
                variant: 'determinate',
                value:
                  (session.data.user.totalFileSize / MAX_FILE_USER_STORAGE) *
                  100,
              })}
              sx={{
                position: 'absolute',
                zIndex: 2,
                circle: {
                  strokeLinecap: 'round',
                },
              }}
            />
            <CircularProgress
              variant="determinate"
              value={100}
              sx={{
                opacity: 0.3,
              }}
            />
          </Box>
          <Stack>
            <Typography variant="caption" color="primary.dark">
              Storage
            </Typography>
            <Typography
              variant="caption"
              color="primary.dark"
              fontWeight="bold"
            >
              {convertBytes(
                session.data?.user.totalFileSize ?? 0,
                'GB'
              ).toFixed(2)}{' '}
              <Typography
                component="span"
                color="primary.dark"
                fontWeight="lighter"
                variant="caption"
                sx={{
                  opacity: 0.45,
                }}
              >
                / {formatBytes(MAX_FILE_USER_STORAGE)}
              </Typography>
            </Typography>
          </Stack>
        </Stack>
        <Button
          onClick={toggle}
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mt: 1 }}
        >
          Upgrade
        </Button>
      </Box>
      <StorageModal isOpen={isOpen} toggle={toggle} />
    </>
  );
}
