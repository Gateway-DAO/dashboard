import { common } from '@/locale/en/common';
import { FaDiscord, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa';

import { Button, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

import AliasMenuButton from '../alias-menu-button';
import AccountSection from './account-section';
import SectionSkeleton from './section-skeleton';

const socials = [
  { icon: FaGoogle, name: 'Google', type: 'GOOGLE' },
  { icon: FaGithub, name: 'Github', type: 'GITHUB' },
  { icon: FaDiscord, name: 'Discord', type: 'DISCORD', signed: true },
  { icon: FaTwitter, name: 'Twitter', type: 'TWITTER', signed: true },
];

type Props = {
  onDisconnect: (type: string) => void;
};

export default function SocialsSection({ onDisconnect }: Props) {
  return (
    <AccountSection title="Other accounts">
      {socials.length === 0 && <SectionSkeleton />}
      {socials.length > 0 &&
        socials.map(({ icon: Icon, name, type, signed }) => (
          <ListItem
            key={name}
            secondaryAction={
              signed ? (
                <AliasMenuButton onDisconnect={() => onDisconnect(type)} />
              ) : (
                <Button variant="outlined">{common.actions.connect}</Button>
              )
            }
          >
            <ListItemAvatar
              sx={{
                display: 'flex',
                alignItems: 'center',
                mr: 2,
                minWidth: 'unset',
                fontSize: 24,
              }}
            >
              <Icon />
            </ListItemAvatar>
            <ListItemText primary={name} />
          </ListItem>
        ))}
    </AccountSection>
  );
}
