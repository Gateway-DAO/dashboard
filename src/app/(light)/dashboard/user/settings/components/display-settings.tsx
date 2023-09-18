"use client"

import AvatarPicker from "@/components/form/avatar-picker/avatar-picker";
import GTWAvatar from "@/components/gtw-avatar/gtw-avatar";
import { useSession } from "@/context/session-provider";
import { common } from "@/locale/en/common";
import { useForm, Controller } from "react-hook-form";
import zod from "zod";

import { Box, Button, FormControl, FormHelperText, FormLabel, Input, InputAdornment, InputLabel, Stack, TextField } from "@mui/material";

import DisplayName from "./display-fields/display-name";

const validations = zod.object({
  // name: zod.string().min(1, "Please enter your name"),
  gatewayId: zod.string().min(1, "Please enter your Gateway Id"),
  // avatar: zod.string().url({ message: "Please enter a valid URL" }),
})

export default function DisplaySettings() {
  const { session } = useSession();

  const { register, control, watch } = useForm<{
    avatar: string,
    gatewayId: string,
    name: string
  }>({
    defaultValues: {
      avatar: undefined,
      gatewayId: session?.user?.gatewayId ?? undefined,
      name: undefined
    }
  })

  const { user: {
    gatewayId
  } } = session;

  return <>
    <Stack spacing={3} alignItems="flex-start">
      <FormControl>
        <FormLabel htmlFor="avatar" sx={{ fontSize: 14 }}>{common.general.avatar}</FormLabel>
        <AvatarPicker name="avatar" control={control} username={gatewayId!} />
      </FormControl>
      <DisplayName />
      <TextField
        id="gateway-id"
        label="Username"
        helperText=" You can edit it once a month"
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
        }}
        {...register("gatewayId")}
      />
    </Stack>
  </>
}
