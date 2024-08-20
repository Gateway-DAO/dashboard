import Link from 'next/link';

import DataModelsBoxIcon from '@/components/icons/data-models-box';
import HomeDataRequestTemplatesIcon from '@/components/icons/data-request-template-box';
import HomeTransactionIcon from '@/components/icons/home-transaction';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import InternalHeader from '@/components/internal/internal-header';
import routes from '@/constants/routes';

const GetIcon = ({ index, sx }: { index: number; sx: SxProps<Theme> }) => {
  return (
    <>
      {index === 0 && <HomeTransactionIcon sx={sx} />}
      {index === 1 && <DataModelsBoxIcon sx={sx} />}
      {index === 2 && <HomeDataRequestTemplatesIcon sx={sx} />}
    </>
  );
};

export default function Header() {
  const exploreHomeBanners = [
    {
      title: 'Check a transaction',
      description:
        'Transactions serve as a comprehensive audit trail, meticulously recording all activities performed at the protocol layer.',
      link_text: 'Verify transactions',
      link: routes.explorer.transactions,
      target: '_self',
    },
    {
      title: 'Upload Data',
      description:
        'Structured data assets are arranged in Data Models. Each data uploaded using a data model adheres to a standardized structure.',
      link_text: 'Discover Data Models',
      link: routes.explorer.dataModels,
      target: '_self',
    },
  ];

  return (
    <InternalHeader>
      <Container>
        <Typography
          variant="h2"
          fontWeight={300}
          sx={{
            maxWidth: { xs: '95%', lg: '60%' },
          }}
        >
          Explore transactions and interact with the protocol
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            flexDirection: 'row',
            overflow: 'auto',
            mt: 7,
          }}
        >
          {exploreHomeBanners.map((details, index) => (
            <Paper
              component={Link}
              href={details.link}
              target={details.target}
              key={index}
              variant="outlined"
              sx={{
                padding: 2,
                paddingLeft: 2,
                width: '100%',
                minWidth: '282px',
                marginTop: 2,
                mr: 1,
                textDecoration: 'none',
                '&:last-child': { mr: 0 },
              }}
            >
              <Stack
                sx={{ height: '100%' }}
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <GetIcon
                  index={index}
                  sx={{ width: 'auto', height: 80, mb: 2 }}
                />
                <Box>
                  <Typography mt={2} variant="h5" gutterBottom>
                    {details.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
                    {details.description}
                  </Typography>
                  <Button variant="text">
                    {details.link_text}
                    {details.target === '_blank' && (
                      <OpenInNewIcon sx={{ ml: 0.8, height: 18, width: 18 }} />
                    )}
                  </Button>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Box>
      </Container>
    </InternalHeader>
  );
}
