import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { GatewayProfile } from '@/utils/get-organization-or-user-data';

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListProps,
} from '@mui/material';

type Props = {
  profiles: GatewayProfile[];
} & ListProps;

export default function ProfileList({ profiles, ...props }: Props) {
  return (
    <List
      disablePadding
      {...props}
      sx={{
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        ...props.sx,
      }}
    >
      {profiles.map((profile) => (
        <ListItem
          key={profile.id}
          disablePadding
          sx={{
            gap: 1,
          }}
        >
          <ListItemAvatar
            sx={{
              minWidth: 'unset',
            }}
          >
            <GTWAvatar
              src={profile.image}
              name={profile.name ?? profile.gatewayId}
              size={32}
            />
          </ListItemAvatar>
          <ListItemText
            primary={profile.name ?? `@${profile.gatewayId}`}
            secondary={profile.name ? `@${profile.gatewayId}` : undefined}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
            }}
          />
        </ListItem>
      ))}
    </List>
  );
}
