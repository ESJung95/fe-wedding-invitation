export type AccessType = "LINK" | "QR";

interface InvitationApiData {
  personalized: boolean;
  name: string | null;
  side: "GROOM" | "BRIDE" | null;
}

interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

interface FetchInvitationParams {
  token?: string;
  accessType: AccessType;
}

interface FetchInvitationResult {
  personalized: boolean;
  name?: string;
}

const REQUEST_TIMEOUT_MS = 4000;

/**
 * 백엔드 GET /api/invitation을 호출합니다.
 *
 * - token이 있으면 개인화 조회(accessType=LINK), 없으면 익명 조회(accessType=QR)로 사용됩니다.
 * - 서버 컴포넌트에서만 호출하는 것을 전제로 합니다. 브라우저가 아닌 Next.js 서버에서
 *   백엔드로 직접 요청이 나가므로, 백엔드가 HTTPS 인증서를 아직 적용하지 않은 상태에서도
 *   Mixed Content 제약 없이 호출할 수 있습니다.
 * - 환경변수 누락, 네트워크 오류, 응답 실패, token 무효 등 어떤 이유로든 실패하면
 *   예외를 던지지 않고 { personalized: false }를 반환해 항상 기본(비개인화) 화면으로
 *   자연스럽게 대체되도록 합니다.
 */
export async function fetchInvitation({
  token,
  accessType,
}: FetchInvitationParams): Promise<FetchInvitationResult> {
  const baseUrl = process.env.INVITATION_API_BASE_URL;

  if (!baseUrl) {
    console.warn(
      "[invitation-api] INVITATION_API_BASE_URL이 설정되지 않았습니다. 비개인화 화면으로 대체합니다."
    );
    return { personalized: false };
  }

  const url = new URL("/api/invitation", baseUrl);
  url.searchParams.set("accessType", accessType);
  if (token) {
    url.searchParams.set("token", token);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url.toString(), {
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      console.warn(
        `[invitation-api] 요청이 실패했습니다 (status: ${response.status}). 비개인화 화면으로 대체합니다.`
      );
      return { personalized: false };
    }

    const body: ApiEnvelope<InvitationApiData> = await response.json();

    if (!body.success || !body.data) {
      console.warn(
        "[invitation-api] 응답에 데이터가 없습니다. 비개인화 화면으로 대체합니다."
      );
      return { personalized: false };
    }

    return {
      personalized: body.data.personalized,
      name: body.data.name ?? undefined,
    };
  } catch (error) {
    console.warn(
      "[invitation-api] 호출 중 오류가 발생했습니다. 비개인화 화면으로 대체합니다.",
      error
    );
    return { personalized: false };
  } finally {
    clearTimeout(timeoutId);
  }
}
