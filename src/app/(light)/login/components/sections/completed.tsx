import NextLink from 'next/link';

import { WalletIconsTransition } from '@/components/wallet-icons-transition/wallet-icons-transition';
import { auth } from '@/locale/en/auth';
import { AiFillGithub } from 'react-icons/ai';
import { FaTwitter } from 'react-icons/fa';

import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Button,
  Dialog,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';

import { SocialAuthCardLink } from '../social-auth-card-link';

type Props = {
  open: boolean;
  onClose: string;
};

export function ConnectMoreAuthDialog({ open, onClose }: Props) {
  return (
    <Dialog
      open={open}
      sx={{
        '& .MuiPaper-root': {
          backgroundImage: 'none',
        },
      }}
      fullScreen
      keepMounted={false}
    >
      <Stack margin={{ xs: 2, md: 5 }}>
        <Stack justifyContent={'space-between'} direction={'row'}>
          <Avatar
            alt="Gateway logo"
            src="favicon-192.png"
            sx={{
              width: 28,
              height: 28,
              alignSelf: 'center',
            }}
          />
          <IconButton
            component={NextLink}
            href={onClose}
            sx={{
              width: 40,
              height: 40,
              alignSelf: 'center',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <Typography
          variant="h4"
          width={{ xs: '100%', md: '35%' }}
          mt={{ xs: 4, md: 20.75 }}
          gutterBottom
        >
          {auth.steps.completed.connect_more.title}
        </Typography>
        <Typography width={{ xs: '100%', md: '35%' }} variant="body1">
          {auth.steps.completed.connect_more.description}
        </Typography>
        <Stack marginTop={6} direction={{ xs: 'column', md: 'row' }} gap={2}>
          <SocialAuthCardLink
            title={auth.connected_accounts.wallet.title}
            description={auth.connected_accounts.wallet.description}
            icon={<WalletIconsTransition />}
            href={`#wallets`}
          />
          <SocialAuthCardLink
            title={auth.connected_accounts.github.title}
            description={auth.connected_accounts.github.description}
            icon={<AiFillGithub />}
            href={`#other-accounts`}
          />
          <SocialAuthCardLink
            title={auth.connected_accounts.twitter.title}
            description={auth.connected_accounts.twitter.description}
            icon={<FaTwitter />}
            href={`#other-accounts`}
          />
        </Stack>
        <Typography
          width={{ xs: '100%', md: '35%' }}
          variant="caption"
          mt={4}
          gutterBottom
        >
          {auth.steps.completed.connect_more.terms_data}
          <Link href="/terms" underline="none">
            {' '}
            {auth.steps.completed.connect_more.terms}
          </Link>{' '}
          {auth.steps.completed.connect_more.and}{' '}
          <Link href="/terms" underline="none">
            {' '}
            {auth.steps.completed.connect_more.privacy_policy}{' '}
          </Link>
          .
        </Typography>
        <div>
          <NextLink href={onClose} passHref>
            <Button
              component="a"
              size="large"
              variant="contained"
              sx={{ mt: 4 }}
            >
              {auth.steps.completed.connect_more.done}
            </Button>
          </NextLink>
        </div>
      </Stack>
    </Dialog>
  );
}
