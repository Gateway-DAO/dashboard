"use client";

import { useState } from "react";

import { useGtwSession } from "@/context/gtw-session-provider";
import { common } from "@/locale/en/common";
import { useForm } from "react-hook-form";

import { Button, Stack, TextField } from "@mui/material";

export default function DisplayName() {
  const { session } = useGtwSession();

  const [displayName, setDisplayName] = useState<string>();

  const { register, control, watch, reset, handleSubmit, formState, setValue } = useForm<{
    displayName: string
  }>({
    defaultValues: {
      displayName: displayName
    }
  })

  const onCancel = () => {
    reset();
  }

  const onSubmit = (data: {
    displayName: string
  }) => {
    setDisplayName(data.displayName);
    reset();
    setValue("displayName", data.displayName)
  }


  return <form onSubmit={handleSubmit(onSubmit)}>
    <TextField
      id="displayName"
      label="Display Name"
      fullWidth
      sx={{ maxWidth: 478 }}
      {...register("displayName")}
    />
    {formState.dirtyFields.displayName && <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 2 }}>
      <Button variant="contained" type="submit">{common.actions.save}</Button>
      <Button variant='outlined' type="button" onClick={onCancel}>{common.actions.cancel}</Button>
    </Stack>}
  </form>
}
