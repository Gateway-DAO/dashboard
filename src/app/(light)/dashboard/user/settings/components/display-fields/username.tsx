"use client";

import { useSession } from "next-auth/react";

import { useGtwSession } from "@/context/gtw-session-provider";
import { common } from "@/locale/en/common";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import { Button, InputAdornment, Skeleton, Stack, TextField } from "@mui/material";

export default function Username() {
  const { data: session, update } = useSession()
  const { privateApi } = useGtwSession()
  const { mutateAsync } = useMutation({
    mutationKey: ["updateUsername"],
    mutationFn: async (username: string) => privateApi.update_display_name({ displayName: "" }),
  })


  const { enqueueSnackbar } = useSnackbar()

  const { register, control, watch, reset, handleSubmit, formState, setValue } = useForm<{
    username: string
  }>({
    values: {
      username: session?.user.gatewayId ?? ""
    },
  })

  const username = watch("username");

  const onCancel = () => {
    reset();
    if (session?.user.gatewayId) {
      setValue("username", session?.user.gatewayId)
    }
  }

  const onSubmit = async (data: {
    username: string
  }) => {
    try {
      await mutateAsync(data.username);
      await update();
      reset();
    } catch {
      enqueueSnackbar("Failed to update display name", { variant: "error" });
    }
  }



  return <form onSubmit={handleSubmit(onSubmit)}>
    {session ? <TextField
      id="username"
      label="Username"
      helperText=" You can edit it once a month"
      InputProps={{
        startAdornment: <InputAdornment position="start">@</InputAdornment>,
      }}
      {...register("username")}
    /> : <Skeleton sx={{
      maxWidth: 478,
      width: "100%",
      height: 80,
      mt: '0 !important'
    }} />}
    {username !== session?.user.gatewayId && <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 2 }}>
      <Button variant="contained" type="submit">{common.actions.save}</Button>
      <Button variant='outlined' type="button" onClick={onCancel}>{common.actions.cancel}</Button>
    </Stack>}
  </form>
}
