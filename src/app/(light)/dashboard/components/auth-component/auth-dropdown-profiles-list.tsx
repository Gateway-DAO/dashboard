'use client';
import { useSession } from 'next-auth/react';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import MenuItemLink from '@/components/menu-item-link/menu-item-link';
import routes from '@/constants/routes';
import useOrganization from '@/hooks/use-organization';
import { auth } from '@/locale/en/auth';

import AddIcon from '@mui/icons-material/Add';
import {
  Chip,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Typography,
  alpha,
} from '@mui/material';

type Props = {
  onClose: () => void;
};

const CreateOrgLink = () => {
  return (
    <MenuItemLink href={routes.dashboard.createOrg}>
      <ListItemIcon>
        <IconButton
          sx={{
            backgroundColor: 'primary.light',
          }}
        >
          <AddIcon htmlColor="#771AC9" />
        </IconButton>
      </ListItemIcon>
      <ListItemText secondary={auth.create_org.desc}>
        <Typography variant="subtitle1">{auth.create_org.title}</Typography>
      </ListItemText>
    </MenuItemLink>
  );
};

export default function AuthDropdownProfilesList({ onClose }: Props) {
  const { data: session } = useSession();

  const { isOrg, organization } = useOrganization();

  if (!session) return null;

  const { user } = session;

  const accessess = isOrg
    ? user.accesses?.filter(
        ({ organization: accessOrganization }) =>
          accessOrganization.did !== organization.id
      )
    : user.accesses;

  if (!user.accesses?.length)
    return (
      <>
        <CreateOrgLink />
        <Divider />
      </>
    );

  return (
    <>
      {accessess?.map(({ organization }) => (
        <MenuItemLink
          href={routes.dashboard.org.home(organization.did)}
          key={organization.did}
          onClick={onClose}
        >
          <ListItemIcon>
            <GTWAvatar
              src={organization.image ?? null}
              name={organization.image ? organization.name : organization.did}
              hasBorder={!!organization.image}
            />
          </ListItemIcon>
          <ListItemText secondary={`@${organization.did}`}>
            {organization.name}
          </ListItemText>
          <Chip
            label="ORG"
            size="small"
            sx={(theme) => ({
              backgroundColor: alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
              color: 'primary.main',
            })}
          />
        </MenuItemLink>
      ))}
      {isOrg && (
        <MenuItemLink
          href={routes.dashboard.user.home}
          key={user.did}
          onClick={onClose}
        >
          <ListItemIcon>
            <GTWAvatar name={user.did} />
          </ListItemIcon>
          <ListItemText secondary={`@${user.username}`}>
            {user.username}
          </ListItemText>
        </MenuItemLink>
      )}
      <CreateOrgLink />
      <Divider />
    </>
  );
}
