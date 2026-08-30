"use client";

import sectionStyles from "./Section.module.css";
import styles from "./Location.module.css";
import { useToast } from "./ToastContext";
import type { LocationInfo } from "@/types/invitation";
import { getMapConfig } from "@/lib/integrations/kakaoMap";
import { copyToClipboard } from "@/lib/clipboard";
import { buildKakaoMapLink, buildNaverMapLink, buildTmapLink } from "@/lib/mapLinks";

interface LocationProps {
  venue: LocationInfo;
  appName: string;
}

export default function Location({ venue, appName }: LocationProps) {
  const { showToast } = useToast();

  // 지금은 좌표만 받아두고, 카카오맵 SDK 연동 시 이 config로 지도를 그립니다.
  getMapConfig({
    latitude: venue.latitude,
    longitude: venue.longitude,
    name: venue.name,
  });

  const mapTarget = {
    name: venue.name,
    latitude: venue.latitude,
    longitude: venue.longitude,
  };

  async function handleCopyAddress() {
    const result = await copyToClipboard(venue.address, "주소가 복사되었습니다");
    showToast(result.message);
  }

  return (
    <section className={sectionStyles.sec}>
      <h2 className={styles.title}>오시는 길</h2>

      <div className={styles.address}>
        <b>{venue.name}</b>
        <span className={styles.addressRow}>
          {venue.address}
          <button
            className={styles.copyIconBtn}
            onClick={handleCopyAddress}
            aria-label="주소 복사"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="9" y="9" width="12" height="12" rx="2" />
              <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
            </svg>
          </button>
        </span>
      </div>

      <div className={styles.mapPlaceholder}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b9a76" strokeWidth="1.6">
          <path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12z" />
          <circle cx="12" cy="9" r="2.4" />
        </svg>
        지도 영역 (카카오맵 연동 예정)
      </div>

      <div className={styles.navButtons}>
        <a className={styles.navBtn} href={buildTmapLink(mapTarget)}>
          티맵
        </a>
        <a className={styles.navBtn} href={buildKakaoMapLink(mapTarget)}>
          카카오맵
        </a>
        <a className={styles.navBtn} href={buildNaverMapLink(mapTarget, appName)}>
          네이버지도
        </a>
      </div>

      <div className={styles.infoCard}>
        <div className={styles.infoBlock}>
          <p className={styles.infoTitle}>지하철</p>
          <p className={styles.infoText}>{venue.subway}</p>
        </div>

        <div className={styles.infoBlock}>
          <p className={styles.infoTitle}>버스</p>
          <p className={styles.busStop}>{venue.busStop}</p>
          <ul className={styles.busList}>
            {venue.busLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div className={styles.infoBlockLast}>
          <p className={styles.infoTitle}>자가용</p>
          {venue.carRoutes.map((route) => (
            <div key={route.title} className={styles.carRoute}>
              <p className={styles.carRouteTitle}>{route.title}</p>
              <ol className={styles.carSteps}>
                {route.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <div className={styles.navAddressRow}>
          내비게이션 검색: <b>{venue.navAddress}</b>
        </div>

        <div className={styles.infoBlockLast}>
          <p className={styles.infoTitle}>주차</p>
          <p className={styles.infoText}>{venue.parking}</p>
        </div>
      </div>
    </section>
  );
}
