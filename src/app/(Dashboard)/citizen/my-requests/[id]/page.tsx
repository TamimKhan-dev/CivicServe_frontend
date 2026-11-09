import { RequestDetailsPage } from "@/app/(Dashboard)/_components/common/request-details/request-details";

export default async function CitizenRequestDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <RequestDetailsPage id={id} />;
}
