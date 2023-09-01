
import PdaCard from "@/components/pda-card/pda-card";
import routes from "@/constants/routes";
import { pdas as pdasLocales } from "@/locale/en/pda"
import { Credential } from "@/services/protocol/types";
import { DeepPartial } from "react-hook-form";

import { Typography } from "@mui/material";

import PDAsListContainer from "./pdas-list-container";

type Props = {
  pdas: DeepPartial<Credential>[]
}

export default async function PDAsList({ pdas }: Props) {
  if (!pdas.length) {
    return <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", width: "100%" }}>{pdasLocales.empty}</Typography>
  }
  return <PDAsListContainer>
    {pdas.map((pda) => (
      <PdaCard key={pda.id} href={routes.dashboardUserAsset.replace("[id]", pda.id!)} name={pda.title!} issuerImage={pda.image} issuerName={"GET ISSUER NAME"} status={pda.status!} />
    ))}
  </PDAsListContainer>
}
