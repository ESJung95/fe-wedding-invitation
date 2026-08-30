export interface MapConfig {
  latitude: number;
  longitude: number;
  name: string;
}

/**
 * 카카오맵 연동 스텁입니다.
 * 백엔드 배포 시 이 함수를 실제 카카오맵 SDK 초기화 로직으로 교체하면 됩니다.
 * 지금은 위치 정보만 그대로 반환합니다.
 */
export function getMapConfig(config: MapConfig): MapConfig {
  // TODO: 카카오맵 JavaScript SDK 초기화 및 마커 렌더링 연동
  return config;
}
