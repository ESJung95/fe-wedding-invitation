import type { IntegrationResult } from "./kakaoShare";
import type { AccessType } from "@/lib/api/invitation";

export interface GuestMessage {
  name: string;
  text: string;
  token?: string;
  accessType: AccessType;
}

interface ApiEnvelope {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
}

const SUCCESS_MESSAGE = "메시지가 저장되었습니다. 신랑, 신부만 확인할 수 있어요";
const FALLBACK_ERROR_MESSAGE =
  "메시지 저장에 실패했습니다. 잠시 후 다시 시도해 주세요";

/**
 * 축하 메시지를 저장합니다.
 *
 * 브라우저에서는 Next.js Route Handler(/api/message)를 호출하고, 실제 백엔드
 * 요청은 서버에서 프록시됩니다.
 *
 * 에러 메시지 정책
 * - 4xx: 백엔드가 내려준 error.message를 그대로 사용합니다. 검증 문구는
 *   백엔드에서 단일 관리하며, 프론트에서 중복 정의하지 않습니다.
 * - 5xx, 네트워크 오류, 응답 파싱 실패: 프론트 고정 문구를 사용합니다.
 */
export async function saveGuestMessage(
  message: GuestMessage
): Promise<IntegrationResult> {
  if (!message.name.trim() || !message.text.trim()) {
    return { status: "error", message: "이름과 메시지를 모두 입력해 주세요" };
  }

  try {
    const response = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: message.token,
        accessType: message.accessType,
        guestName: message.name.trim(),
        content: message.text.trim(),
      }),
    });

    if (response.ok) {
      return { status: "success", message: SUCCESS_MESSAGE };
    }

    if (response.status >= 400 && response.status < 500) {
      const body = (await response.json().catch(() => null)) as ApiEnvelope | null;
      return {
        status: "error",
        message: body?.error?.message ?? FALLBACK_ERROR_MESSAGE,
      };
    }

    return { status: "error", message: FALLBACK_ERROR_MESSAGE };
  } catch {
    return { status: "error", message: FALLBACK_ERROR_MESSAGE };
  }
}
