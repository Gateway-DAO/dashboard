"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Avatar, Divider, ListItemIcon, MenuItem, Typography } from "@mui/material";

type Props = {
  onClose: () => void;
}

export default function AuthDropdown({ onClose }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const onSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (!session) return null;

  const { user } = session;

  return (<>
    {user.accesses?.length && <>
      {user.accesses.map(({ organization }) => (
        <MenuItem key={organization.id} onClick={onClose}>
          <ListItemIcon>
            <Avatar src={organization.image || undefined} sizes="small" />
          </ListItemIcon>
          <Typography variant="body2">{organization.name}</Typography>
        </MenuItem>
      ))}
      <Divider />
    </>}
    <MenuItem onClick={onClose}>Profile</MenuItem>
    <MenuItem onClick={onSignOut}>Logout</MenuItem>
  </>)
}
