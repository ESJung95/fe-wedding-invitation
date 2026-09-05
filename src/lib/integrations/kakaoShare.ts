import { copyToClipboard, type IntegrationResult } from "@/lib/clipboard";

export type { IntegrationResult };

export interface KakaoShareContent {
  jsKey: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface KakaoGlobal {
  isInitialized: () => boolean;
  init: (key: string) => void;
  Share: {
    sendDefault: (options: Record<string, unknown>) => void;
  };
}

declare global {
  interface Window {
    Kakao?: KakaoGlobal;
  }
}

function getInitializedKakao(jsKey: string): KakaoGlobal | null {
  if (typeof window === "undefined" || !window.Kakao) return null;
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(jsKey);
  }
  return window.Kakao;
}

/**
 * 카카오 JavaScript SDK(Kakao.Share.sendDefault)로 실제 공유 카드를 띄웁니다.
 * SDK 스크립트는 layout.tsx에서 미리 불러옵니다.
 */
export async function shareToKakao(
  content: KakaoShareContent
): Promise<IntegrationResult> {
  const kakao = getInitializedKakao(content.jsKey);

  if (!kakao) {
    return {
      status: "error",
      message: "카카오톡 공유를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요",
    };
  }

  kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: content.title,
      description: content.description,
      imageUrl: content.imageUrl,
      link: {
        mobileWebUrl: content.link,
        webUrl: content.link,
      },
    },
    buttons: [
      {
        title: "청첩장 보기",
        link: {
          mobileWebUrl: content.link,
          webUrl: content.link,
        },
      },
    ],
  });

  return { status: "success", message: "" };
}

export async function copyShareLink(link: string): Promise<IntegrationResult> {
  return copyToClipboard(link, "청첩장 링크가 복사되었습니다");
}
