export const dynamic = "force-dynamic";

import { LANDING_NAVBAR_HEIGHT } from "@/theme/config/style-tokens";

import {
  Container,
  Box,
  Divider,
  Stack,
  Chip,
  Skeleton,
  Typography,
} from "@mui/material";

import { PostsLoadingList } from "./components/post-list/posts-loading-list";

export default function LoadingPage() {
  return (
    <>
      <Stack
        component={Container}
        sx={{
          ...LANDING_NAVBAR_HEIGHT,
          pb: 10,
        }}
      >
        <Box
          sx={{
            pt: 4,
          }}
        >
          <Stack
            sx={{
              gap: 5,
              textDecoration: "none",
              color: "text.primary",
            }}
            direction={{
              xs: "column-reverse",
              lg: "row",
            }}
          >
            <Stack alignItems="flex-start" width="100%">
              <Skeleton
                variant="rounded"
                width={80}
                height={32}
                sx={{ mb: 1 }}
              />
              <Typography
                variant="h2"
                color="text.primary"
                component="span"
                sx={{
                  mb: 1,
                  typography: {
                    xs: "h4",
                    lg: "h2",
                  },
                  fontWeight: "lighter!important",
                  ":hover": {
                    textDecoration: "underline",
                  },
                  width: "100%",
                }}
              >
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="65%" />
              </Typography>
              <Typography variant="caption" color="text.secondary">
                <Skeleton variant="text" width={80} />
              </Typography>
            </Stack>
            <Box
              sx={{
                height: "100%",
                overflow: "hidden",
                aspectRatio: 777 / 433,
                borderRadius: 1,
                flexShrink: 0,
                width: {
                  xs: "100%",
                  lg: 777,
                },
              }}
            >
              <Skeleton variant="rectangular" height="100%" width="100%" />
            </Box>
          </Stack>
        </Box>
        <Divider
          sx={{
            my: {
              xs: 6,
              md: 7,
            },
          }}
        />
        <Stack
          direction="row"
          gap={1}
          sx={{
            mb: {
              xs: 4,
              md: 6,
            },
          }}
        >
          <Chip label="All" />
          <Skeleton variant="rounded" width={80} height={32} />
          <Skeleton variant="rounded" width={54} height={32} />
        </Stack>
        {/* <TagList tags={tags} /> */}
        <Stack gap={5}>
          <Box
            sx={{
              gap: 2,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
            }}
          >
            <PostsLoadingList />
            <PostsLoadingList />
            <PostsLoadingList />
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
