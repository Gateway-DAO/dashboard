
//Mock async function

import Link from "next/link";

import { apiPublic } from "@/services/protocol/api"

import { Stack } from "@mui/material";

const getPDAs = async () => {
  const pdas = await apiPublic.pdas();
  return pdas.credentials;
}

export default async function PDAsList() {
  const pdas = await getPDAs();
  return <>
    This is a list of pdas
    <Stack direction="column">
      {pdas.map((pda) => (
        <Link key={pda.id} href={`/dashboard/user/pda/${pda.id}`}>{pda.title}</Link>
      ))}
    </Stack>
  </>
}
