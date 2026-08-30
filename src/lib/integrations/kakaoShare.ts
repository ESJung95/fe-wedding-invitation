import { copyToClipboard, type IntegrationResult } from "@/lib/clipboard";

export type { IntegrationResult };

/**
 * 카카오톡 공유 연동 스텁입니다.
 * 백엔드/카카오 SDK 연동 시 이 함수 내부만 실제 SDK 호출로 교체하면 됩니다.
 * 호출하는 컴포넌트 쪽 코드는 수정할 필요가 없습니다.
 */
export async function shareToKakao(): Promise<IntegrationResult> {
  // TODO: 카카오 SDK(Kakao.Share.sendDefault 등) 연동
  return {
    status: "stub",
    message: "실제 서비스에서는 카카오톡 공유 화면으로 연결됩니다",
  };
}

export async function copyShareLink(link: string): Promise<IntegrationResult> {
  return copyToClipboard(link, "청첩장 링크가 복사되었습니다");
}
