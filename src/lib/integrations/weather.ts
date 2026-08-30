export interface WeatherInfo {
  temperature: number;
  description: string;
  isEstimate: boolean;
}

/**
 * 기상청 날씨 연동 스텁입니다.
 * 실제 서비스에서는 예식 90일 전부터 기상청 예보 API로 교체됩니다.
 */
export async function getWeddingDayWeather(): Promise<WeatherInfo> {
  // TODO: 기상청 단기예보 API 연동 (예식 90일 전부터 호출)
  return {
    temperature: 6,
    description: "맑음 · 서울 강남구 예상 기온 (예시)",
    isEstimate: true,
  };
}
