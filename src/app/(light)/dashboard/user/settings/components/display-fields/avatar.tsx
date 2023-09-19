"use client"
import { useSession } from "next-auth/react";

import AvatarPicker from "@/components/form/avatar-picker/avatar-picker";
import { useGtwSession } from "@/context/gtw-session-provider";
import { common } from "@/locale/en/common";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { FormControl, FormLabel, Skeleton, Stack } from "@mui/material";

export default function Avatar() {
  const { data: session, update } = useSession()
  const { privateApi } = useGtwSession()
  const { mutateAsync } = useMutation({
    mutationKey: ["update-avatar"],
    mutationFn: async (profilePictureUrl: string | null) => privateApi.update_profile_picture_url({ profilePictureUrl }),
  })

  const { enqueueSnackbar } = useSnackbar()


  const onSubmit = async (
    profilePicture: string | null
  ) => {
    try {
      await mutateAsync(profilePicture);
      await update();
    } catch {
      enqueueSnackbar("Failed to update avatar", { variant: "error" });
    }
  }

  return <FormControl>
    <FormLabel htmlFor="avatar" sx={{ fontSize: 14 }}>{common.general.avatar}</FormLabel>
    {session ? <AvatarPicker name="profilePicture" username={session.user.gatewayId!} value={session.user.profilePicture} onChange={onSubmit} /> : <Stack direction="row" spacing={2} alignItems="center">
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton width={120} height={46} />
    </Stack>}
  </FormControl>

}
