import PdaCardSkeleton from "@/components/pda-card/pda-card-skeleton";

import PDAsListContainer from "./pdas-list-container";

export default function PDAsListSkeleton() {
  return <PDAsListContainer>
    <PdaCardSkeleton />
    <PdaCardSkeleton />
    <PdaCardSkeleton />
    <PdaCardSkeleton />
    <PdaCardSkeleton />
    <PdaCardSkeleton />
    <PdaCardSkeleton />
    <PdaCardSkeleton />
  </PDAsListContainer>
}
