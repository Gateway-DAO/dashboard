import Link from 'next/link';

import DataModelsBoxIcon from '@/components/icons/data-models-box';
import HomeTransactionIcon from '@/components/icons/home-transaction';
import InternalHeader from '@/components/internal/internal-header';
import routes from '@/constants/routes';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  Stack,
  Typography,
} from '@mui/material';

export default function Header() {
  const banners = [
    {
      title: 'Check a transaction',
      description:
        'Transactions serve as a comprehensive audit trail, meticulously recording all activities performed at the protocol layer.',
      link_text: 'Verify transactions',
      href: routes.explorer.transactions,
      target: '_self',
      icon: HomeTransactionIcon,
    },
    {
      title: 'Explore Data Models',
      description:
        'Structured data assets are arranged in Data Models. Each data uploaded using a data model adheres to a standardized structure.',
      link_text: 'Discover Data Models',
      href: routes.explorer.dataModels,
      target: '_self',
      icon: DataModelsBoxIcon,
    },
  ];

  return (
    <>
      <InternalHeader
        slot={
          <Typography
            variant="h2"
            sx={{
              maxWidth: { xs: '85%', lg: '60%' },
            }}
          >
            Explore transactions and interact with the protocol
          </Typography>
        }
      ></InternalHeader>
      <Container>
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          sx={{
            justifyContent: 'space-between',
            gap: 2,
            mt: 2,
            mb: 7,
          }}
        >
          {banners.map(
            ({ title, description, link_text, href, target, icon: Icon }) => (
              <Card key={title} variant="outlined">
                <CardActionArea
                  component={Link}
                  href={href}
                  target={target}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    p: 2,
                    textDecoration: 'none',
                    width: '100%',
                  }}
                >
                  <Icon sx={{ width: 'auto', height: 80, mb: 2 }} />
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      {title}
                    </Typography>
                    <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
                      {description}
                    </Typography>
                    <Button variant="text">
                      {link_text}
                      {target === '_blank' && (
                        <OpenInNewIcon
                          sx={{ ml: 0.8, height: 18, width: 18 }}
                        />
                      )}
                    </Button>
                  </Box>
                </CardActionArea>
              </Card>
            )
          )}
        </Stack>
      </Container>
    </>
  );
}
