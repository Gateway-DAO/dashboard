"use client"

import { Stack } from "@mui/material";

import Avatar from "./display-fields/avatar";
import DisplayName from "./display-fields/display-name";
import Username from "./display-fields/username";


export default function DisplaySettings() {

  return <>
    <Stack spacing={3} alignItems="flex-start">
      <Avatar />
      <DisplayName />
      <Username />
    </Stack>
  </>
}
