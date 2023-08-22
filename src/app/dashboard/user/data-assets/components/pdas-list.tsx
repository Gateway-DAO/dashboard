
import PdaCard from "@/components/pda-card/pda-card";
import routes from "@/constants/routes";
import { apiPublic } from "@/services/protocol/api"
import { Chain } from "@/services/protocol/types";

import PDAsListContainer from "./pdas-list-container";

const getPDAs = async () => {
  const pdas = await apiPublic.pdas();
  return pdas.credentials;
}

export default async function PDAsList() {
  const pdas = await getPDAs();
  return <PDAsListContainer>
    {pdas.map((pda) => (
      <PdaCard key={pda.id} href={routes.dashboardUserPDA.replace("[id]", pda.id)} name={pda.title} chain={Chain.Evm} image={pda.image} status="valid" />
    ))}
  </PDAsListContainer>
}
