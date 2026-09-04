import InvitationApp from "@/components/invitation/InvitationApp";
import { invitationContent } from "@/data/invitationContent";
import { fetchInvitation } from "@/lib/api/invitation";

// 이 경로는 인쇄된 청첩장의 QR코드가 가리키는 주소입니다.
// token 없이 접속하므로 개인화하지 않고, accessType=QR로 조회 기록만 남깁니다.
export const dynamic = "force-dynamic";

export default async function BasicInvitePage() {
  await fetchInvitation({ accessType: "QR" });

  return <InvitationApp content={invitationContent} />;
}
