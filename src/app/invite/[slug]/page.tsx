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

  // token이 유효하지 않으면 guest는 null이지만 token은 그대로 전달합니다.
  // 메시지 작성 시 백엔드가 token으로 하객을 다시 조회하며, 없으면 익명 메시지로 저장됩니다.
  return (
    <InvitationApp
      content={invitationContent}
      guestName={guest?.name}
      token={slug}
      accessType="LINK"
    />
  );
}
