import { NextResponse } from "next/server";

const REQUEST_TIMEOUT_MS = 4000;

interface ProxyErrorBody {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

function errorResponse(status: number, code: string, message: string) {
  const body: ProxyErrorBody = { success: false, error: { code, message } };
  return NextResponse.json(body, { status });
}

/**
 * 축하 메시지 작성 프록시입니다.
 *
 * 브라우저는 이 엔드포인트(/api/message)만 호출하고, 실제 백엔드
 * POST /api/invitation/message 호출은 Next.js 서버에서 수행합니다.
 * - 백엔드 URL(INVITATION_API_BASE_URL)이 브라우저에 노출되지 않습니다.
 * - 브라우저 입장에서는 동일 출처 요청이므로 CORS 설정과 무관합니다.
 * - 백엔드 응답(상태 코드, body)은 그대로 전달하고, 프록시 자체 실패만
 *   별도 에러 코드(PROXY_xxx)로 구분합니다.
 */
export async function POST(request: Request) {
  const baseUrl = process.env.INVITATION_API_BASE_URL;

  if (!baseUrl) {
    console.error("[message-proxy] INVITATION_API_BASE_URL이 설정되지 않았습니다.");
    return errorResponse(500, "PROXY_001", "서버 설정 오류가 발생했습니다");
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return errorResponse(400, "PROXY_002", "요청 형식이 올바르지 않습니다");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const upstream = await fetch(new URL("/api/invitation/message", baseUrl), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal,
    });

    const text = await upstream.text();

    return new NextResponse(text, {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[message-proxy] 백엔드 호출 중 오류가 발생했습니다.", error);
    return errorResponse(502, "PROXY_003", "메시지 저장에 실패했습니다");
  } finally {
    clearTimeout(timeoutId);
  }
}
