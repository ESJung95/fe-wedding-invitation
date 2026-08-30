import type { GuestInfo } from "@/types/invitation";

/**
 * slug(하객별 고유 링크 조각)에 대응하는 하객 정보 매핑입니다.
 * 지금은 정적 데이터지만, 백엔드가 준비되면 이 함수 내부만
 * API 호출로 교체하면 됩니다. 호출하는 쪽 컴포넌트는 수정할 필요가 없습니다.
 */
const guestMap: Record<string, GuestInfo> = {
  kimminjun: { name: "김민준" },
};

export async function getGuestBySlug(slug: string): Promise<GuestInfo | null> {
  // TODO: 백엔드 연동 시 fetch(`/api/guests/${slug}`) 등으로 교체
  return guestMap[slug] ?? null;
}
