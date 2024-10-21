import { ContentCopy } from '@mui/icons-material';
import { Box, IconButton, ListItem, Skeleton } from '@mui/material';
import { Typography, Stack } from '@mui/material';

export default function AccessSkeleton() {
  return (
    <ListItem
      component={Stack}
      direction="row"
      alignItems="center"
      sx={{
        px: {
          xs: 0,
          lg: 4,
        },
      }}
      gap={2}
    >
      <Box>
        <Skeleton variant="circular" width={45} height={45} />
      </Box>
      <Stack direction="column" alignItems="flex-start" width="100%">
        <Typography component="span" variant="subtitle1" color="text.primary">
          <Skeleton variant="text" width={140} height={28} />
        </Typography>

        <Stack
          component="span"
          direction="row"
          alignItems="center"
          lineHeight={1}
          justifyContent="flex-start"
          gap={0.5}
        >
          <Typography
            component="span"
            variant="caption"
            fontWeight={400}
            color="text.secondary"
            lineHeight={1}
            textOverflow="ellipsis"
            overflow="hidden"
          >
            <Skeleton variant="text" width={72} height={28} />
          </Typography>
          <IconButton disabled>
            <ContentCopy
              sx={{
                fontSize: 16,
                color: 'text.disabled',
                lineHeight: 1,
              }}
            />
          </IconButton>
        </Stack>
      </Stack>
      <Typography
        variant="caption"
        color="text.secondary"
        align="right"
        flexShrink={0}
      >
        <Skeleton variant="text" width={120} height={28} />
      </Typography>
    </ListItem>
  );
}
