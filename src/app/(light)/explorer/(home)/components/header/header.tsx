import Link from 'next/link';

import HomeDataModelsIcon from '@/components/icons/home-data-models';
import HomeDataRequestTemplatesIcon from '@/components/icons/home-templates';
import HomeTransactionIcon from '@/components/icons/home-transaction';
import { explorer_home } from '@/locale/en/explorer-home';

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

import ExplorerHeader from '../../../components/header/header';

const GetIcon = ({ index, sx }: { index: number; sx: SxProps<Theme> }) => {
  return (
    <>
      {index === 0 && <HomeTransactionIcon sx={sx} />}
      {index === 1 && <HomeDataModelsIcon sx={sx} />}
      {index === 2 && <HomeDataRequestTemplatesIcon sx={sx} />}
    </>
  );
};

export default function Header() {
  return (
    <ExplorerHeader>
      <Container>
        <Typography
          variant="h2"
          fontWeight={300}
          sx={{
            maxWidth: { xs: '95%', lg: '60%' },
          }}
        >
          {explorer_home.title}
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
          {explorer_home.banners.map((details, index) => (
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
    </ExplorerHeader>
  );
}
