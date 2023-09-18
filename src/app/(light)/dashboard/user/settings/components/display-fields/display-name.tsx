"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import { useGtwSession } from "@/context/gtw-session-provider";
import { common } from "@/locale/en/common";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import { Button, Skeleton, Stack, TextField } from "@mui/material";

export default function DisplayName() {
  const { data: session, update } = useSession()
  const { privateApi } = useGtwSession()
  const { mutateAsync } = useMutation({
    mutationKey: ["updateDisplayName"],
    mutationFn: async (displayName: string) => privateApi.update_display_name({ displayName }),
  })


  const { enqueueSnackbar } = useSnackbar()

  const { register, control, watch, reset, handleSubmit, formState, setValue } = useForm<{
    displayName: string
  }>({
    values: {
      displayName: session?.user.displayName ?? ""
    },
  })

  const displayName = watch("displayName");

  const onCancel = () => {
    reset();
    if (session?.user.displayName) {
      setValue("displayName", session?.user.displayName)
    }
  }

  const onSubmit = async (data: {
    displayName: string
  }) => {
    try {
      await mutateAsync(data.displayName);
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

  return <form onSubmit={handleSubmit(onSubmit)}>
    <TextField
      id="displayName"
      label="Display Name"
      fullWidth
      sx={{ maxWidth: 478 }}
      {...register("displayName")}
    />
    {displayName !== session?.user.displayName && <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 2 }}>
      <Button variant="contained" type="submit">{common.actions.save}</Button>
      <Button variant='outlined' type="button" onClick={onCancel}>{common.actions.cancel}</Button>
    </Stack>}
  </form>
}
