import type { IntegrationResult } from "./kakaoShare";

export interface GuestMessage {
  name: string;
  text: string;
}

/**
 * 축하 메시지 저장 연동 스텁입니다.
 * 백엔드 배포 시 이 함수 내부만 실제 API 호출(POST /api/messages 등)로 교체하면 됩니다.
 */
export async function saveGuestMessage(
  message: GuestMessage
): Promise<IntegrationResult> {
  if (!message.name.trim() || !message.text.trim()) {
    return { status: "error", message: "이름과 메시지를 모두 입력해 주세요" };
  }
  // TODO: 백엔드 저장 API 연동
  return {
    status: "stub",
    message: "메시지가 저장되었습니다. 신랑, 신부만 확인할 수 있어요",
  };
}
