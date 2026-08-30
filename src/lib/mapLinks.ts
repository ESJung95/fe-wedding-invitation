export interface MapLinkTarget {
  name: string;
  latitude: number;
  longitude: number;
}

/**
 * 각 지도 앱의 길찾기 딥링크입니다. 백엔드 없이 클라이언트에서 바로 동작합니다.
 * 모바일에 해당 앱이 설치되어 있으면 앱으로 연결되고, 없으면 아무 동작도 하지 않을 수 있습니다.
 */
export function buildTmapLink(target: MapLinkTarget): string {
  const { name, latitude, longitude } = target;
  return `tmap://route?goalname=${encodeURIComponent(name)}&goalx=${longitude}&goaly=${latitude}`;
}

export function buildKakaoMapLink(target: MapLinkTarget): string {
  const { latitude, longitude } = target;
  return `kakaomap://route?ep=${latitude},${longitude}&by=CAR`;
}

export function buildNaverMapLink(target: MapLinkTarget, appName: string): string {
  const { name, latitude, longitude } = target;
  return `nmap://route/car?dlat=${latitude}&dlng=${longitude}&dname=${encodeURIComponent(
    name
  )}&appname=${encodeURIComponent(appName)}`;
}
