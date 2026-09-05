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
 */
export function openMapLink(schemeUrl: string, fallbackUrl: string) {
  const start = Date.now();

  window.location.href = schemeUrl;

  setTimeout(() => {
    if (Date.now() - start < 2100) {
      window.location.href = fallbackUrl;
    }
  }, 1500);
}
