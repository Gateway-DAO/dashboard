import PDAPage from '@/app/(light)/dashboard/user/asset/[id]/page';

export default function PDAOrgPage({
  params,
}: {
  params: { id: string; username: string };
}) {
  return <PDAPage params={params} />;
}
