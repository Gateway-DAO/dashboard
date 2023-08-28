import { apiPublic } from "@/services/protocol/api";

import PDAItem from "../../../data-asset/[id]/components/pda-item";

type Props = {
  id: string;
}

const getPDA = async (id: string) => {
  // const pda = await apiPublic.pda({ id });
  // return pda.credential;
  throw new Error("YEY")
};

export default async function PDADetail({ id }: Props) {
  const pda = await getPDA(id);
  console.log("YEY")
  return <>Joao é lindo</>
  // return <PDAItem pda={pda} viewOnly={true} />
}
