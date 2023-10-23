import { Box, Container, Typography } from '@mui/material';

import DataModelExplorerCard from '../../components/data-model-card';
import FeaturedCardsContainer from './cards-container';

export default function DataModelsExplorerFeatured() {
  return (
    <Container
      sx={{
        py: 3,
      }}
    >
      <Typography
        component="h3"
        variant="h5"
        sx={{
          mb: 2,
        }}
      >
        Featured
      </Typography>
      <Box
        sx={{
          gap: 2,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
      ></Box>
      <FeaturedCardsContainer>
        {[1, 2, 3, 4].map((_, index) => (
          <Box
            key={index}
            sx={
              index !== 0
                ? {
                    pl: 2,
                  }
                : {
                    width: 'calc(100% - 16px)',
                  }
            }
          >
            <DataModelExplorerCard />
          </Box>
        ))}
      </FeaturedCardsContainer>
    </Container>
  );
}
