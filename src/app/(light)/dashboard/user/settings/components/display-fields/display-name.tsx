"use client";

import { useSession } from "@/context/session-provider";
import { useForm } from "react-hook-form";

import { TextField } from "@mui/material";

export default function DisplayName() {
  const { session } = useSession();

  const { register, control, watch, reset } = useForm<{
    displayName: string
  }>({
    defaultValues: {
      displayName: undefined
    }
  })


  return <form>
    <TextField
      id="displayName"
      label="Display Name"
      fullWidth
      sx={{ maxWidth: 478 }}
      {...register("displayName")}
    />
  </form>
}
