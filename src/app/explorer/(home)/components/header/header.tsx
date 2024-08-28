import Link from 'next/link';

import DataModelsBoxIcon from '@/components/icons/data-models-box';
import HomeTransactionIcon from '@/components/icons/home-transaction';
import InternalHeader from '@/components/internal/internal-header';
import routes from '@/constants/routes';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Box,
  Button,
  Paper,
  Stack,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';

const GetIcon = ({ index, sx }: { index: number; sx: SxProps<Theme> }) => {
  return (
    <>
      {index === 0 && <HomeTransactionIcon sx={sx} />}
      {index === 1 && <DataModelsBoxIcon sx={sx} />}
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
      title: 'Explore Data Models',
      description:
        'Structured data assets are arranged in Data Models. Each data uploaded using a data model adheres to a standardized structure.',
      link_text: 'Discover Data Models',
      link: routes.explorer.dataModels,
      target: '_self',
    },
  ];

  return (
    <>
      <InternalHeader
        slot={
          <Typography
            variant={{ xs: 'h4', lg: 'h2' }}
            fontWeight={{ xs: 400, lg: 300 }}
            fontSize={{ xs: '34px', lg: '60px' }}
            sx={{
              maxWidth: { xs: '85%', lg: '60%' },
              ml: { xs: 2, lg: 0 },
            }}
          >
            Explore transactions and interact with the protocol
          </Typography>
        }
      ></InternalHeader>
      <Stack
        sx={{
          direction: 'row',
          justifyContent: 'space-between',
          gap: 2,
          flexDirection: 'row',
          overflow: 'auto',
          mt: 2,
          mb: 7,
          mx: 5,
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
              width: { lg: '100%' },
              marginTop: 2,
              mr: 1,
              textDecoration: 'none',
              '&:last-child': { mr: 0 },
            }}
          >
            <Stack
              sx={{
                height: { xs: '330px', lg: '100%' },
                width: { xs: '300px', lg: '100%' },
              }}
              flexDirection="column"
              justifyContent={{ xs: 'none', lg: 'space-between' }}
              alignItems="flex-start"
            >
              <GetIcon
                index={index}
                sx={{ width: 'auto', height: 80, mb: { xs: 0, lg: 2 } }}
              />
              <Box>
                <Typography
                  sx={{ mt: { xs: 10, lg: 2 } }}
                  variant="h5"
                  gutterBottom
                >
                  {details.title}
                </Typography>
                <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
                  {details.description}
                </Typography>
                <Button variant="text" sx={{ mt: { xs: 1, lg: 0 } }}>
                  {details.link_text}
                  {details.target === '_blank' && (
                    <OpenInNewIcon sx={{ ml: 0.8, height: 18, width: 18 }} />
                  )}
                </Button>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </>
  );
}
