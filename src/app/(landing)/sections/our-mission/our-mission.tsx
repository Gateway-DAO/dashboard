import { Box, Container, Divider, Stack, Typography } from '@mui/material';

import { ActiveContextProvider, MissionImage, OurMissionItem } from './item';
import { missions } from './missons';

export default function OurMission() {
  return (
    <Stack
      component={Container}
      flexDirection={{
        xs: 'column',
        lg: 'row',
      }}
      sx={{
        pt: {
          xs: 6,
          md: 17.5,
        },
        pb: {
          xs: 6,
          md: 15,
        },
        color: 'white.main',
      }}
      gap={3}
    >
      <Box
        sx={{
          width: {
            lg: 316,
          },
          flexShrink: {
            lg: 0,
          },
        }}
      >
        <Typography
          component="h2"
          variant="subtitle1"
          sx={{
            color: 'primary.200',
          }}
          fontWeight="lighter"
        >
          Our Foundation
        </Typography>
      </Box>
      <ActiveContextProvider>
        <Box sx={{ position: 'relative' }}>
          <MissionImage />
          <Typography
            variant="h3"
            color="inherit"
            sx={{
              typography: {
                xs: 'h5',
                sm: 'h4 ',
                md: 'h3',
              },
            }}
          >
            Gateway’s Virtual Machine: The Foundation of Programmable
            Cryptography
          </Typography>
          <Stack
            gap={3}
            divider={
              <Divider
                variant="light"
                sx={{
                  maxWidth: {
                    md: 664,
                  },
                }}
              />
            }
            sx={{
              mt: {
                xs: 6,
                sm: 9,
                md: 18.5,
              },
            }}
          >
            {missions.map(({ id, text, title }) => (
              <OurMissionItem id={id} key={id}>
                <Typography variant="h5" color="primary.200">
                  {title}
                </Typography>
                <Typography
                  sx={{
                    maxWidth: {
                      md: 664,
                    },
                  }}
                >
                  {text}
                </Typography>
              </OurMissionItem>
            ))}
          </Stack>
        </Box>
      </ActiveContextProvider>
    </Stack>
  );
}
