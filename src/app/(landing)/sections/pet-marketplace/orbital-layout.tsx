'use client';

import React from 'react';

import {
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
  styled,
  Container,
  Stack,
  Tooltip,
  useMediaQuery,
} from '@mui/material';

import { CustomLogo } from './custom-logo';

interface OrbitItem {
  id: string;
  label: string;
  description: string;
  orbit: number;
}

interface OrbitalLayoutProps {
  items?: OrbitItem[];
}

const defaultItems: OrbitItem[] = [
  {
    id: 'pre',
    label: 'PRE',
    description: 'PRE for proxy re-encryption',
    orbit: 1.0,
  },
  {
    id: 'fhe',
    label: 'FHE',
    description: 'FHE for fully homomorphic encryption',
    orbit: 1.0,
  },
  {
    id: 'tee',
    label: 'TEE',
    description: 'TEEs for trusted execution environments',
    orbit: 1.5,
  },
  {
    id: 'dfs',
    label: 'DFS',
    description: 'DFS for secure distributed file store',
    orbit: 1.0,
  },
  {
    id: 'gcs',
    label: 'GCs',
    description: 'GCs for Garbled Circuits',
    orbit: 1.0,
  },
];

const StyledSVGContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  margin: '0 auto',
  paddingBottom: 150,
  [theme.breakpoints.down('md')]: {
    paddingBottom: 100,
  },
  [theme.breakpoints.down('sm')]: {
    paddingBottom: 50,
  },
  '& svg': {
    overflow: 'visible',
  },
  '& text': {
    userSelect: 'none',
  },
  '& .orbital-item': {
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.standard,
    }),
  },
  '& .orbital-circle': {
    transition: theme.transitions.create(['fill'], {
      duration: theme.transitions.duration.standard,
    }),
  },
}));

const calculatePosition = (index: number, total: number, radius: number) => {
  const angle = (index * (360 / total) - 100) * (Math.PI / 180);
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
};

// Responsive dimensions
const getDimensions = (isMobile: boolean, isTablet: boolean) => {
  if (isMobile) {
    return {
      width: 400,
      height: 400,
      orbitRadius: 140,
      buttonSize: 64,
      logoSize: 30,
      centerLogoSize: 40,
    };
  }
  if (isTablet) {
    return {
      width: 600,
      height: 500,
      orbitRadius: 180,
      buttonSize: 80,
      logoSize: 35,
      centerLogoSize: 50,
    };
  }
  return {
    width: 800,
    height: 600,
    orbitRadius: 260,
    buttonSize: 96,
    logoSize: 40,
    centerLogoSize: 60,
  };
};

const OrbitalLayout: React.FC<OrbitalLayoutProps> = ({
  items = defaultItems,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const { width, height, orbitRadius, buttonSize, logoSize, centerLogoSize } =
    getDimensions(isMobile, isTablet);

  const centerX = width / 2;
  const centerY = height / 2;

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
        <Paper
          elevation={0}
          sx={{
            bgcolor: 'background.default',
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
          }}
        >
          <Stack
            alignItems="center"
            sx={{
              mb: { xs: 5, sm: 7, md: 10 },
            }}
          >
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              align="center"
              gutterBottom
              fontWeight="500"
            >
              PETs marketplace
            </Typography>
            <Typography
              align="center"
              gutterBottom
              maxWidth="sm"
              sx={{
                mb: 4,
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}
            >
              Gateway enables dApps to route specialized privacy computations to
              the most suitable Privacy Enhancing Technology.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              size={isMobile ? 'medium' : 'large'}
            >
              Learn more
            </Button>
          </Stack>
          <StyledSVGContainer>
            <svg
              viewBox={`0 0 ${width} ${height}`}
              style={{ width: '100%', height: 'auto' }}
            >
              {/* Orbital Circles */}
              {[0.5, 1.0, 1.5, 2.0, 2.5].map((multiplier) => (
                <circle
                  display={multiplier >= 2.0 && isMobile ? 'none' : 'visible'}
                  key={`orbit-${multiplier}`}
                  cx={centerX}
                  cy={centerY}
                  r={orbitRadius * multiplier}
                  style={{
                    fill: 'none',
                    stroke: theme.palette.divider,
                    strokeWidth: 1,
                  }}
                />
              ))}

              {/* Center Logo */}
              <g transform={`translate(${centerX}, ${centerY})`}>
                <circle
                  r={centerLogoSize}
                  style={{
                    fill: theme.palette.primary.main,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                  }}
                />
                <g
                  transform={`translate(-${logoSize / 2}, -${logoSize / 2})`}
                  className="logo-group"
                  style={{
                    transition: theme.transitions.create(['transform'], {
                      duration: theme.transitions.duration.standard,
                    }),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CustomLogo
                    size={{
                      xs: 28,
                      sm: 34,
                      md: 38,
                      lg: 40,
                    }}
                    color={theme.palette.common.white}
                  />
                </g>
              </g>

              {/* Orbital Items */}
              {items.map((item, index) => {
                const position = calculatePosition(
                  index,
                  items.length,
                  orbitRadius * item.orbit
                );
                const halfButtonSize = buttonSize / 2;

                return (
                  <g
                    key={item.id}
                    className="orbital-item"
                    transform={`translate(${centerX + position.x}, ${
                      centerY + position.y
                    })`}
                  >
                    <foreignObject
                      style={{
                        overflow: 'visible',
                        transform: `translate(-${halfButtonSize}px, -${halfButtonSize}px)`,
                      }}
                    >
                      <Tooltip title={item.description}>
                        <Button
                          sx={{
                            backgroundColor: 'primary.light',
                            cursor: 'pointer',
                            color: 'black',
                            fontWeight: isMobile ? '500' : '800',
                            fontSize: {
                              xs: '0.75rem',
                              sm: '0.875rem',
                              md: theme.typography.subtitle2.fontSize,
                            },
                            height: buttonSize,
                            width: buttonSize,
                            minWidth: buttonSize,
                            padding: 1,
                            borderRadius: '100%',
                            borderStyle: 'solid',
                            borderColor: 'divider',
                            borderWidth: 1,
                            '&:hover': {
                              backgroundColor: 'primary.light',
                              transform: 'scale(1.1)',
                            },
                          }}
                        >
                          {item.label}
                        </Button>
                      </Tooltip>
                    </foreignObject>
                  </g>
                );
              })}
            </svg>
          </StyledSVGContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default OrbitalLayout;
