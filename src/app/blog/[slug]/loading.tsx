export const revalidate = 1200;

import { LANDING_NAVBAR_HEIGHT } from '@/theme/config/style-tokens';

import { Skeleton } from '@mui/material';
import { Box, Container, Stack, Typography } from '@mui/material';

import { PostsLoadingList } from '../components/post-list/posts-loading-list';

export default function BlogPostLoading() {
  return (
    <Container
      component="article"
      sx={{
        ...LANDING_NAVBAR_HEIGHT,
      }}
    >
      <Stack
        sx={{
          pt: {
            xs: 0,
            md: 7,
          },
        }}
      >
        <Stack
          component="header"
          alignSelf="center"
          maxWidth={662}
          width="100%"
        >
          <Skeleton width={80} height={32} variant="rounded" />

          <Typography
            sx={{
              typography: {
                xs: 'h4',
                md: 'h2',
              },
            }}
            gutterBottom
          >
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
          </Typography>

          <Stack
            mt={3}
            display="flex"
            justifyContent="space-between"
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            <Stack alignSelf="flex-start" flexDirection="row">
              <Skeleton variant="circular" width={40} height={40} />

              <Stack ml={2}>
                <Typography variant="subtitle2">
                  <Skeleton variant="text" width={100} />
                </Typography>
                <Typography variant="body2">
                  <Skeleton variant="text" width={70} />
                </Typography>
              </Stack>
            </Stack>
            <Stack mt={{ md: 0, xs: 2 }} alignSelf="center">
              <Stack direction="row" columnGap={1}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Stack component="main">
          <Stack
            component="figure"
            sx={{
              mx: {
                xs: -3,
                md: -6,
                lg: 0,
              },
              mb: 0,
              mt: 8,
              '& img': {
                borderRadius: {
                  xs: 0,
                  lg: 1,
                },
              },
            }}
          >
            <Box alignSelf="center">
              <Skeleton
                variant="rectangular"
                width="100%"
                sx={{
                  aspectRatio: '16/9',
                  minWidth: 1152,
                  minHeight: 648,
                }}
              />
            </Box>
          </Stack>
          <Stack
            sx={{
              maxWidth: 664,
              alignSelf: 'center',
              width: '100%',
              mt: 8,
              gap: 1,
            }}
          >
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} variant="text" width="100%" />
              ))}
            <Skeleton
              variant="rounded"
              width="100%"
              height={450}
              sx={{ my: 2.5 }}
            />
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} variant="text" width="100%" />
              ))}
          </Stack>
        </Stack>
      </Stack>
      <Stack
        component="footer"
        mt={7}
        pb={{
          xs: 4,
          md: 15,
        }}
      >
        <Typography
          sx={{
            typography: {
              xs: 'h4',
              md: 'h3',
            },
          }}
        >
          Read more
        </Typography>
        <Stack
          gap={3}
          mt={6}
          display="grid"
          sx={{
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
          }}
        >
          <PostsLoadingList />
        </Stack>
      </Stack>
    </Container>
  );
}
