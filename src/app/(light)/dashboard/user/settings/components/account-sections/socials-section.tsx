import { common } from '@/locale/en/common';
import { FaDiscord, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa';

import { Button, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

import AliasMenuButton from '../alias-menu-button';
import AccountSection from './account-section';

const socials = [
  { icon: FaGoogle, name: 'Google' },
  { icon: FaGithub, name: 'Github' },
  { icon: FaDiscord, name: 'Discord', signed: true },
  { icon: FaTwitter, name: 'Twitter', signed: true },
];

type Props = {
  onDisconnect: (type: string) => void;
};

export default function SocialsSection({ onDisconnect }: Props) {
  return (
    <AccountSection title="Other accounts">
      {socials.map(({ icon: Icon, name, signed }) => (
        <ListItem
          key={name}
          secondaryAction={
            signed ? (
              <AliasMenuButton onDisconnect={() => onDisconnect(name)} />
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
