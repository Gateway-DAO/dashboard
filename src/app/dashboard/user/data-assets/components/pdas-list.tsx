
import PdaCard from "@/components/pda-card/pda-card";
import routes from "@/constants/routes";
import { pdas as pdasLocales } from "@/locale/en/pda"
import { apiPublic } from "@/services/protocol/api"
import { Chain } from "@/services/protocol/types";

import { Typography } from "@mui/material";

import PDAsListContainer from "./pdas-list-container";

const getPDAs = async () => {
  const pdas = await apiPublic.pdas();
  return pdas.credentials;
}

export default async function PDAsList() {
  const pdas = await getPDAs();
  if (!pdas.length) {
    return <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", width: "100%" }}>{pdasLocales.empty}</Typography>
  }
  return <PDAsListContainer>
    {pdas.map((pda) => (
      <PdaCard key={pda.id} href={routes.dashboardUserPDA.replace("[id]", pda.id)} name={pda.title} chain={Chain.Evm} image={pda.image} status="valid" />
    ))}
  </PDAsListContainer>
}
