import { DataRequest, DataResourceStatus } from "@/services/protocol/types"
import { PartialDeep } from "type-fest";

import RequestsTable from "./components/requests-table";

const mockrequest: PartialDeep<DataRequest> = {
  id: "1",
  createdAt: "2021-10-13T14:00:00.000Z",
  status: DataResourceStatus.Accepted,
  proofs: [],
  userVerifier: {
    id: "1",
    gatewayId: "user"
  },
  dataRequestTemplate: {
    id: "121321213213",
  }
}

const oneHundredMockRequests = Array.from({ length: 100 }, (_, i) => ({ ...mockrequest, id: `${i}` }))

export default function DashboardUserDataRequestsPage() {
  return (
    <>
      <h1>DashboardUserDataRequestsPage</h1>
      <RequestsTable data={oneHundredMockRequests} />
    </>
  );
}
