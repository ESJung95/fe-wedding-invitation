import type { GuestInfo } from "@/types/invitation";
import { fetchInvitation } from "@/lib/api/invitation";

/**
 * URL의 token(개인화 링크의 슬러그 자리)으로 백엔드에 하객 정보를 조회합니다.
 * accessType은 항상 LINK로 고정됩니다. token이 붙은 개인화 링크는 카카오톡 등으로
 * 개별 전달되는 경로이기 때문입니다.
 *
 * token이 유효하지 않거나 API 호출이 실패하면 null을 반환하며, 호출하는 쪽에서는
 * 이를 익명 접근과 동일하게 처리해 기본(비개인화) 화면을 보여주면 됩니다.
 */
export async function getGuestBySlug(slug: string): Promise<GuestInfo | null> {
  const result = await fetchInvitation({ token: slug, accessType: "LINK" });

  if (!result.personalized || !result.name) {
    return null;
  }

  return { name: result.name };
}
