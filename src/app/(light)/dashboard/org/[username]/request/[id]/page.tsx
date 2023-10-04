import DashboardUserDataRequest from '@/app/(light)/dashboard/user/request/[id]/page';

export default function RequestOrgPage({ params }: { params: { id: string } }) {
  return <DashboardUserDataRequest params={params} />;
}
