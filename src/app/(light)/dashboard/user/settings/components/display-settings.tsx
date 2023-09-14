"use client"

import GTWAvatar from "@/components/gtw-avatar/gtw-avatar";
import { useSession } from "@/context/session-provider";
import { useForm, Controller } from "react-hook-form";
import zod from "zod";

import { Button, FormControl, FormHelperText, FormLabel, Input, InputAdornment, InputLabel, Stack, TextField } from "@mui/material";

const validations = zod.object({
  // name: zod.string().min(1, "Please enter your name"),
  gatewayId: zod.string().min(1, "Please enter your Gateway Id"),
  // avatar: zod.string().url({ message: "Please enter a valid URL" }),
})

export default function DisplaySettings() {
  const { session } = useSession();

  const { register, control } = useForm({
    defaultValues: {
      avatar: undefined,
      gatewayId: session?.user?.gatewayId,
      name: undefined
    }
  })

  const { user: {
    gatewayId
  } } = session;

  return <>
    <Stack spacing={3} alignItems="flex-start">
      <FormControl>
        <FormLabel htmlFor="avatar" sx={{ fontSize: 14 }}>Avatar</FormLabel>
        <Controller name="avatar" control={control} render={(props) => <Stack component="label" direction="row" gap={2} alignItems="center" sx={{ pt: 1 }}>
          <GTWAvatar name={gatewayId!} src={props.field.value} size={80} />
          <Button size="small" variant="outlined" component="span" sx={{ minWidth: 0 }}>
            Change Image
            <input id="avatar" type="file" hidden {...props.field} />
          </Button>
        </Stack>} />
      </FormControl>
      <TextField
        id="name"
        label="Name"
        fullWidth
        sx={{ maxWidth: 478 }}
        {...register("name")}
      />
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
