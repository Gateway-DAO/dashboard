"use client";

import { useSession } from "next-auth/react";

import { LoadingButton } from "@/components/buttons/loading-button/loading-button";
import { auth } from "@/locale/en/auth";
import { common } from "@/locale/en/common";
import { api } from "@/services/protocol/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Button, Stack, TextField, Typography } from "@mui/material";

import { useStepState } from "../../providers/step-provider";
import { EmailSchema, schemaEmail } from "../../schema";
import useStepHandler from "../../utils/use-step-handler";



export default function AddEmail() {
  const { setStepState } = useStepState()
  const { data: session, update } = useSession()

  const onHandleStep = useStepHandler()

  const { register, handleSubmit, formState: {
    errors
  } } = useForm<EmailSchema>({
    resolver: zodResolver(schemaEmail)
  })

  const sendEmail = useMutation({
    mutationKey: ["add-email-nonce"],
    mutationFn: (email: string) => api(session?.token ?? "").protocol_add_email({ email })
  })

  const onSkip = async () => {
    await update({ ...session, skipEmail: true });
    onHandleStep();
  }

  const onSubmit = async (data: EmailSchema) => {
    try {
      await sendEmail.mutateAsync(data.email_address);
      setStepState({
        step: "verify-email-add-code", values: {
          email: data.email_address
        }
      })
    } catch (e) {
      console.error(e)
    }
  }


  return <Stack
    component="form"
    gap={2}
    direction={'column'}
    onSubmit={handleSubmit(onSubmit)}
  >
    <Typography
      id="title-choose-gateway-id"
      component="h2"
      variant="h4"
      sx={{ mb: 3 }}
    >
      {auth.steps.add_email.title}
    </Typography>
    <Typography component="p" variant="body1" sx={{ mb: 3 }}>
      {auth.steps.add_email.subtitle}
    </Typography>
    <TextField
      required
      label={auth.steps.choose_email.label}
      type="email"
      id="email"
      {...register('email_address')}
      error={!!errors.email_address}
      helperText={errors.email_address?.message as string}
    />
    <Stack direction={'row'} gap={2}>
      <LoadingButton
        variant="contained"
        type="submit"
        isLoading={sendEmail.isLoading}
      >
        {common.actions.continue}
      </LoadingButton>
      <Button type="button" variant="outlined" onClick={onSkip}>
        {auth.steps.add_email.skip}
      </Button>
    </Stack>
  </Stack>
}
