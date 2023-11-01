'use client';

import { useRouter } from 'next/navigation';

import GatewayDarkBanner from '@/components/icons/gateway-dark-banner';
import { home } from '@/locale/en/home';
import { useToggle } from '@react-hookz/web';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box } from '@mui/material';
import { Button, Paper, Stack, Typography, Link } from '@mui/material';

import CreateOrgDialog from '../../../components/create-layout-dialog';
import GetIcon from './get-icon';

type Props = {
  username: string;
};

export default function HomeStructure({ username }: Props) {
  const [isCreateOrgDialog, toggleDialog] = useToggle(false);
  const router = useRouter();

  const toggleCreateOrgDialog = (value: boolean) => {
    if (!value) {
      toggleDialog(value);
      router.push('');
    } else {
      router.push('#create-org');
      toggleDialog(value);
    }
  };
  return (
    <>
      <CreateOrgDialog
        open={isCreateOrgDialog}
        onClose={() => toggleCreateOrgDialog(false)}
      />
      <Typography variant="h3" marginBottom={4} gutterBottom>
        {home.greeting} {username}
      </Typography>
      <Box
        component={Link}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        width="100%"
        height="25%"
        padding={2}
        bgcolor="#771AC91F"
        borderRadius={1}
        href={home.main_banner.link}
        target="_blank"
        sx={{ textDecoration: 'none' }}
      >
        <GatewayDarkBanner
          sx={{
            width: 50,
            height: 54,
            justifySelf: 'flex-start',
          }}
        />
        <Stack
          justifyContent="space-between"
          sx={{ flexDirection: { xs: 'column', md: 'row' } }}
        >
          <div>
            <Typography variant="h5" color="common.dark" gutterBottom>
              {home.main_banner.title}
            </Typography>
            <Typography variant="body2" color="common.dark" gutterBottom>
              {home.main_banner.subtitle}
            </Typography>
          </div>
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: 'common.dark',
              paddingX: 0.6,
              marginTop: { xs: 1, md: 4 },
            }}
          >
            {home.main_banner.btn_text}
            <OpenInNewIcon sx={{ ml: 0.8, height: 16, width: 16 }} />
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {home.sub_banner.map((details, index) => (
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
              marginTop: 2,
              mr: 1,
              textDecoration: 'none',
              '&:last-child': { mr: 0 },
            }}
            onClick={() => {
              if (details.title == home.sub_banner[0].title) {
                toggleCreateOrgDialog(true);
              }
            }}
          >
            <Stack flexDirection={'column'} justifyContent={'space-between'}>
              <GetIcon index={index} sx={{ width: 60, height: 50, mb: 2 }} />
              <div>
                <Typography
                  sx={{ mt: { xs: 0, md: 10 } }}
                  variant="body2"
                  color="text.secondary"
                >
                  {details.heading}
                </Typography>
                <Typography mt={2} variant="h5" width={250} gutterBottom>
                  {details.title}
                </Typography>
                <Typography
                  variant="body2"
                  width={300}
                  gutterBottom
                  sx={{ mb: 2 }}
                >
                  {details.subtitle}
                </Typography>
                <Button variant="outlined" size="small">
                  {details.btn_text}
                  {details.target === '_blank' && (
                    <OpenInNewIcon sx={{ ml: 0.8, height: 18, width: 18 }} />
                  )}
                </Button>
              </div>
            </Stack>
          </Paper>
        ))}
      </Box>
    </>
  );
}
