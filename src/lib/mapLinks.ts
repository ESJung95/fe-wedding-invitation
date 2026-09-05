export interface MapLinkTarget {
  name: string;
  latitude: number;
  longitude: number;
}

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

/**
 * 각 지도 앱의 길찾기 딥링크입니다. 백엔드 없이 클라이언트에서 바로 동작합니다.
 */
export function buildTmapLink(target: MapLinkTarget): string {
  const { name, latitude, longitude } = target;
  return `tmap://route?goalname=${encodeURIComponent(name)}&goalx=${longitude}&goaly=${latitude}`;
}

export function buildTmapFallbackLink(): string {
  return isIOS()
    ? "https://apps.apple.com/kr/app/id431589174"
    : "https://play.google.com/store/apps/details?id=com.skt.tmap.ku";
}

export function buildKakaoMapLink(target: MapLinkTarget): string {
  const { latitude, longitude } = target;
  return `kakaomap://route?ep=${latitude},${longitude}&by=car`;
}

/**
 * 카카오맵은 앱이 없어도 웹에서 바로 볼 수 있어서, 스토어 대신 웹 지도로 대체합니다.
 */
export function buildKakaoMapFallbackLink(target: MapLinkTarget): string {
  const { name, latitude, longitude } = target;
  return `https://map.kakao.com/link/map/${encodeURIComponent(name)},${latitude},${longitude}`;
}

export function buildNaverMapLink(target: MapLinkTarget, appName: string): string {
  const { name, latitude, longitude } = target;
  return `nmap://route/car?dlat=${latitude}&dlng=${longitude}&dname=${encodeURIComponent(
    name
  )}&appname=${encodeURIComponent(appName)}`;
}

export function buildNaverMapFallbackLink(): string {
  return isIOS()
    ? "https://apps.apple.com/kr/app/id311867728"
    : "https://play.google.com/store/apps/details?id=com.nhn.android.nmap";
}

/**
 * 앱 스킴으로 이동을 시도하고, 일정 시간이 지나도 화면이 그대로면
 * (= 앱이 설치되어 있지 않아 실행되지 않은 것으로 간주) 대체 링크로 이동합니다.
 * 카카오톡 인앱 브라우저 등에서 현재 청첩장 페이지가 사라지지 않도록,
 * 커스텀 스킴(tmap://, kakaomap:// 등) 시도는 화면에 보이지 않는 iframe으로 하고,
 * 대체 링크(스토어/웹, http 주소)만 새 창으로 엽니다.
 */
export function openMapLink(schemeUrl: string, fallbackUrl: string) {
  let didHide = false;

  function onVisibilityChange() {
    if (document.visibilityState === "hidden") {
      didHide = true;
    }
  }

  document.addEventListener("visibilitychange", onVisibilityChange);

  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  try {
    iframe.src = schemeUrl;
  } catch {
    // 일부 브라우저는 커스텀 스킴을 iframe에 넣는 것 자체를 막을 수 있습니다.
  }

  setTimeout(() => {
    document.removeEventListener("visibilitychange", onVisibilityChange);
    document.body.removeChild(iframe);
    if (!didHide) {
      window.open(fallbackUrl, "_blank");
    }
  }, 1500);
}
