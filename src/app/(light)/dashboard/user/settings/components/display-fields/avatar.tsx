"use client"
import { useSession } from "next-auth/react";
import { useState } from "react";

import AvatarPicker from "@/components/form/avatar-picker/avatar-picker";
import { useGtwSession } from "@/context/gtw-session-provider";
import { common } from "@/locale/en/common";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import { Box, Button, FormControl, FormHelperText, FormLabel, Input, InputAdornment, InputLabel, Skeleton, Stack, TextField } from "@mui/material";

export default function Avatar() {
  const { data: session, update } = useSession()
  const { privateApi } = useGtwSession()
  const { mutateAsync } = useMutation({
    mutationKey: ["update-avatar"],
    mutationFn: async (profilePicture: string) => privateApi.update_profile_picture_url({ profilePictureUrl: "" }),
  })


  const { enqueueSnackbar } = useSnackbar()

  const { register, control, watch, reset, handleSubmit, formState, setValue } = useForm<{
    profilePicture: string
  }>({
    values: {
      profilePicture: session?.user.profilePicture ?? ""
    },
  })

  const onCancel = () => {
    reset();
    if (session?.user.profilePicture) {
      setValue("profilePicture", session?.user.profilePicture)
    }
  }

  const onSubmit = async (data: {
    profilePicture: string
  }) => {
    try {
      await mutateAsync(data.profilePicture);
      await update();
      reset();
    } catch {
      enqueueSnackbar("Failed to update display name", { variant: "error" });
    }
  }

  return <form>
    <FormControl>
      <FormLabel htmlFor="avatar" sx={{ fontSize: 14 }}>{common.general.avatar}</FormLabel>
      {session ? <AvatarPicker name="profilePicture" control={control} username={session.user.gatewayId!} /> : <Stack direction="row" spacing={2} alignItems="center">
        <Skeleton variant="circular" width={80} height={80} />
        <Skeleton width={120} height={46} />
      </Stack>}
    </FormControl>

    {formState.dirtyFields.profilePicture && <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>{common.actions.save}</Button>
      <Button variant="outlined" onClick={onCancel}>{common.actions.cancel}</Button>
    </Stack>}

  </form>
}
