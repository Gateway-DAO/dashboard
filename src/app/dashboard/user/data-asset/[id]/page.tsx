import BackButton from "@/components/buttons/back-button";
import TopBarContainer from "@/components/top-bar-container/top-bar-container";
import { apiPublic } from "@/services/protocol/api";

import PDAItem from './components/pda-item';

const getPDA = async (id: string) => {
  const pda = await apiPublic.pda({ id });
  return pda.credential;
};

export default async function PDAPage({ params }: { params: { id: string } }) {

  const pda = await getPDA(params.id);
  return (
    <>
      <TopBarContainer>
        <BackButton />
      </TopBarContainer>
      <PDAItem pda={pda} />
    </>
  );
}
