import { Button, Paper, Stack, Typography, Skeleton } from '@mui/material';
import { Session } from 'next-auth';
import { Box } from '@mui/material';
import BannerIcon from '@/components/icons/banner';
import PDABannerIcon from '@/components/icons/pda-banner';
import PlaygroundIcon from '@/components/icons/playground';
import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';
import { home } from '@/locale/en/home';
import Link from 'next/link';

export default async function Home() {
  const session = (await getGtwServerSession()) as Session;
  return (
    <>
      <Typography variant="h4" marginBottom={4} gutterBottom>
        {home.greeting} {session?.user.displayName}
      </Typography>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        width={'100%'}
        height={'40%'}
        padding={2}
        bgcolor={'primary.light'}
        borderRadius={1}
      >
        <BannerIcon
          sx={{
            width: 246,
            height: 106,
            justifySelf: 'flex-start',
          }}
        />
        <Stack justifySelf={'flex-end'}>
          <Typography variant="h4" color={'common.white'} gutterBottom>
            {home.main_banner.title}
          </Typography>
          <Typography variant="body2" color={'common.white'} gutterBottom>
            {home.main_banner.subtitle}
          </Typography>
          <div>
            <Button
              LinkComponent={Link}
              variant="text"
              size="large"
              href={home.main_banner.link}
              target="_blank"
              sx={{ color: 'common.white', paddingX: 0, borderRadius: 0 }}
            >
              {home.main_banner.btn_text}
            </Button>
          </div>
        </Stack>
      </Box>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 25,
        }}
      >
        <Paper variant="outlined" sx={{ padding: 1.5, width: '100%', mr: 3 }}>
          <PDABannerIcon sx={{ width: 115.82, height: 72 }} />
          <Typography mt={2} variant={'h5'} width={222} gutterBottom>
            {home.sub_banner[0].title}
          </Typography>
          <Typography variant={'body2'} gutterBottom>
            {home.sub_banner[0].subtitle}
          </Typography>
          <Button
            LinkComponent={Link}
            href={home.sub_banner[0].link}
            target="_blank"
            variant="text"
            size="large"
            sx={{ paddingX: 0, borderRadius: 0, marginTop: 1 }}
          >
            {home.sub_banner[0].btn_text}
          </Button>
        </Paper>
        <Paper variant="outlined" sx={{ padding: 1.5, width: '100%' }}>
          <PlaygroundIcon sx={{ width: 84, height: 72 }} />
          <Typography mt={2} variant={'h5'} width={222} gutterBottom>
            {home.sub_banner[1].title}
          </Typography>
          <Typography variant={'body2'} gutterBottom>
            {home.sub_banner[1].subtitle}
          </Typography>
          <Button
            LinkComponent={Link}
            href={home.sub_banner[1].link}
            variant="text"
            size="large"
            sx={{ paddingX: 0, borderRadius: 0, marginTop: 1 }}
          >
            {home.sub_banner[1].btn_text}
          </Button>
        </Paper>
      </div>
    </>
  );
}
