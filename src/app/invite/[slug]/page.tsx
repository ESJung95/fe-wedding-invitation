import InvitationApp from "@/components/invitation/InvitationApp";
import { invitationContent } from "@/data/invitationContent";
import { getGuestBySlug } from "@/data/guests";

// slug(token)마다 백엔드 조회가 매 요청 실행되어야 하므로 정적 캐싱을 사용하지 않습니다.
export const dynamic = "force-dynamic";

export default async function GuestInvitePage({
  params,
}: PageProps<"/invite/[slug]">) {
  const { slug } = await params;
  const guest = await getGuestBySlug(slug);

  return (
    <InvitationApp content={invitationContent} guestName={guest?.name} />
  );
}
