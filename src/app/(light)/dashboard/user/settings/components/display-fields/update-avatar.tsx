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

export default function UpdateAvatar() {
  const { data: session, update } = useSession()
  const { privateApi } = useGtwSession()
  const { mutateAsync } = useMutation({
    mutationKey: ["update-avatar"],
    mutationFn: async (profilePicture: string) => privateApi.update_display_name({ profilePicture }),
  })


  const { enqueueSnackbar } = useSnackbar()

  const { register, control, watch, reset, handleSubmit, formState, setValue } = useForm<{
    profilePicture: string
  }>({
    values: {
      profilePicture: session?.user.profilePicture ?? ""
    },
  })

  const profilePicture = watch("profilePicture");

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


  if (!session) return <Skeleton sx={{
    maxWidth: 478,
    width: "100%",
    height: 80,
    mt: '0 !important'
  }} />;

  return <form><FormControl>
    <FormLabel htmlFor="avatar" sx={{ fontSize: 14 }}>{common.general.avatar}</FormLabel>
    <AvatarPicker name="profilePicture" control={control} username={session.user.gatewayId!} />
  </FormControl></form>
}
