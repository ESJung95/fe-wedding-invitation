"use client";

import { useEffect, useState } from "react";
import sectionStyles from "./Section.module.css";
import styles from "./Weather.module.css";
import { getWeddingDayWeather, type WeatherInfo } from "@/lib/integrations/weather";

export default function Weather() {
  const [weather, setWeather] = useState<WeatherInfo | null>(null);

  useEffect(() => {
    let active = true;
    getWeddingDayWeather().then((result) => {
      if (active) setWeather(result);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className={sectionStyles.sec}>
      <h2 className={sectionStyles.title}>결혼식 날 예상 날씨</h2>
      <div className={styles.card}>
        <div className={styles.icon}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6f8f5c" strokeWidth="1.6">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </div>
        <div>
          <div className={styles.temp}>
            {weather ? `${weather.temperature}°C` : "-- °C"}
          </div>
          <div className={styles.desc}>
            {weather ? weather.description : "날씨 정보를 불러오는 중입니다"}
          </div>
        </div>
      </div>
      <p className={styles.note}>
        실제 서비스에서는 예식 90일 전부터
        <br />
        기상청 예보가 자동으로 반영됩니다
      </p>
    </section>
  );
}
