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
} from '@mui/material';

interface OrbitItem {
  id: string;
  label: string;
  description: string;
  orbit: number;
}

interface OrbitalLayoutProps {
  items?: OrbitItem[];
}

const CustomLogo: React.FC<{ color?: string }> = ({ color = '#F6F4FA' }) => (
  <svg width="33" height="33" viewBox="-30 -30 66 66" fill="none">
    <path
      d="M32.6883 0C28.3956 0 24.1449 0.853563 20.179 2.51195C16.2131 4.17034 12.6096 6.60109 9.57418 9.66539C6.53879 12.7297 4.13099 16.3676 2.48825 20.3713C0.845507 24.375 0 28.6661 0 32.9997C0 37.3333 0.845508 41.6245 2.48825 45.6282C4.13099 49.6319 6.53879 53.2697 9.57418 56.334C12.6096 59.3983 16.2131 61.8291 20.179 63.4875C24.1449 65.1459 28.3956 65.9994 32.6883 65.9994L32.6883 0Z"
      fill={color}
    />
    <path
      d="M37.6702 0H39.8494C54.292 2.16187e-05 66 11.8196 66 26.3998L37.6702 0Z"
      fill={color}
    />
    <path
      d="M66 42.452V66H37.6702V42.452C37.6702 34.8019 44.012 28.6003 51.8351 28.6003C59.6581 28.6003 66 34.8019 66 42.452Z"
      fill={color}
    />
  </svg>
);

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

const OrbitalLayout: React.FC<OrbitalLayoutProps> = ({
  items = defaultItems,
}) => {
  const theme = useTheme();

  const calculatePosition = (index: number, total: number, radius: number) => {
    const angle = (index * (360 / total) - 100) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  // SVG dimensions
  const width = 800;
  const height = 600;
  const centerX = width / 2;
  const centerY = height / 2;
  const orbitRadius = 260;

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            bgcolor: 'background.default',
            p: 4,
            borderRadius: 2,
          }}
        >
          <StyledSVGContainer>
            <svg
              viewBox={`0 0 ${width} ${height}`}
              style={{ width: '100%', height: 'auto' }}
            >
              {/* Title and Description */}
              <text
                x={centerX}
                y="5"
                textAnchor="middle"
                style={{
                  fontSize: theme.typography.h3.fontSize,
                  fill: theme.palette.text.primary,
                }}
              >
                PETs marketplace
              </text>
              <text
                x={centerX}
                y="45"
                textAnchor="middle"
                style={{
                  fontSize: theme.typography.body2.fontSize,
                  fill: theme.palette.text.secondary,
                }}
              >
                Gateway enables dApps to route specialized privacy
              </text>
              <text
                x={centerX}
                y="65"
                textAnchor="middle"
                style={{
                  fontSize: theme.typography.body2.fontSize,
                  fill: theme.palette.text.secondary,
                }}
              >
                computations to the most suitable Privacy Enhancing Technology.
              </text>

              {/* Orbital Circles */}

              <circle
                cx={centerX}
                cy={centerY}
                r={orbitRadius * 2.0}
                style={{
                  fill: 'none',
                  stroke: theme.palette.divider,
                  strokeWidth: 1,
                }}
              />
              <circle
                cx={centerX}
                cy={centerY}
                r={orbitRadius * 1.5}
                style={{
                  fill: 'none',
                  stroke: theme.palette.divider,
                  strokeWidth: 1,
                }}
              />

              <circle
                cx={centerX}
                cy={centerY}
                r={orbitRadius}
                style={{
                  fill: 'none',
                  stroke: theme.palette.divider,
                  strokeWidth: 1,
                }}
              />
              <circle
                cx={centerX}
                cy={centerY}
                r={orbitRadius * 0.5}
                style={{
                  fill: 'none',
                  stroke: theme.palette.divider,
                  strokeWidth: 1,
                }}
              />

              {/* Center Logo */}
              <g transform={`translate(${centerX}, ${centerY})`}>
                <circle
                  r="40"
                  style={{
                    fill: theme.palette.primary.main,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                  }}
                />
                <g
                  transform="translate(-33, -33)"
                  className="logo-group"
                  style={{
                    transition: theme.transitions.create(['transform'], {
                      duration: theme.transitions.duration.standard,
                    }),
                  }}
                >
                  <CustomLogo color={theme.palette.common.white} />
                </g>
              </g>

              {/* Learn More Button */}
              <g transform={`translate(${centerX}, 140)`}>
                <foreignObject
                  x="-60"
                  y="-50"
                  width="100"
                  height="30"
                  style={{ overflow: 'visible' }}
                >
                  <Button variant="outlined" color="primary" size="small">
                    Learn more
                  </Button>
                </foreignObject>
              </g>

              {/* Orbital Items */}
              {items.map((item, index) => {
                const position = calculatePosition(
                  index,
                  items.length,
                  orbitRadius * item.orbit
                );
                return (
                  <g
                    key={item.id}
                    className="orbital-item"
                    transform={`translate(${centerX + position.x}, ${
                      centerY + position.y
                    })`}
                  >
                    <circle
                      r="30"
                      className="orbital-circle"
                      style={{
                        fill: theme.palette.primary.light,
                        cursor: 'pointer',
                      }}
                    />
                    <text
                      textAnchor="middle"
                      dy=".3em"
                      style={{
                        fill: theme.palette.primary.dark,
                        fontSize: theme.typography.subtitle2.fontSize,
                        fontWeight: theme.typography.fontWeightMedium,
                      }}
                    >
                      {item.label}
                    </text>
                    <text
                      textAnchor="middle"
                      y="50"
                      style={{
                        fill: theme.palette.text.secondary,
                        fontSize: theme.typography.caption.fontSize,
                      }}
                    >
                      {item.description.split(' ').map((word, i, arr) => (
                        <tspan key={i} x="0" dy={i === 0 ? 0 : '1.2em'}>
                          {word}
                        </tspan>
                      ))}
                    </text>
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
