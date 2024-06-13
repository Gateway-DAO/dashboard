'use client';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { limitCharsOffset } from '@/utils/string';

import { ContentCopy } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Typography, Stack } from '@mui/material';

export function IndividualDetailRow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack
      direction="column"
      gap={1}
      sx={{
        px: {
          xs: 0,
          lg: 4,
        },
        py: 2,
      }}
    >
      {children}
    </Stack>
  );
}

export function RowText({ title }: { title: string }) {
  return (
    <Typography variant="caption" fontWeight={400} fontSize={12}>
      {title}
    </Typography>
  );
}

export function RowSecondaryText({ text }: { text: string }) {
  return (
    <Typography variant="body2" sx={{ mt: 1, mb: 1.5 }}>
      {text}
    </Typography>
  );
}
export function UserDetails({
  username,
  did,
  copy,
}: {
  username?: string | null;
  did: string;
  copy: (text: string) => Promise<void>;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyItems="flex-start"
      borderRadius={0}
    >
      <GTWAvatar name={did} alt={username ?? did} size={45} />
      <Stack
        component="span"
        direction={!!username ? 'column' : 'row'}
        alignItems={!!username ? 'flex-start' : 'center'}
        pl={2}
        width="100%"
        gap={!!username ? 0 : 1.2}
      >
        <Typography component="span" variant="subtitle1" color="text.primary">
          {username ?? limitCharsOffset(did, 15, 5)}
        </Typography>
        {!!username ? (
          <Stack
            component="span"
            direction="row"
            alignItems="center"
            lineHeight={1}
            justifyContent="flex-start"
            gap={1.2}
            sx={{ mt: -1 }}
          >
            <Typography
              component="span"
              variant="caption"
              fontWeight={400}
              fontSize={12}
              color="text.secondary"
              lineHeight={1}
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {limitCharsOffset(did, 19, 5)}
            </Typography>
            <IconButton onClick={() => copy(did)}>
              <ContentCopy
                sx={{
                  fontSize: 16,
                  color: 'text.disabled',
                }}
              />
            </IconButton>
          </Stack>
        ) : (
          <IconButton onClick={() => copy(did)}>
            <ContentCopy
              sx={{
                fontSize: 16,
                color: 'text.disabled',
              }}
            />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
}
