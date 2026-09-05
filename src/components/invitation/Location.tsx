"use client";

import Image from "next/image";
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

      <div className={styles.mapPlaceholder}>
        <Image
          src="/images/venue/map.jpg"
          alt={`${venue.name} 약도`}
          width={1000}
          height={707}
          sizes="(max-width: 480px) 100vw, 480px"
          className={styles.mapImage}
        />
      </div>

      <div className={styles.infoCard}>
        <div className={styles.infoBlock}>
          <p className={styles.infoTitle}>지하철</p>
          <p className={styles.infoText}>
            <span className={styles.subwayRow}>
              {venue.subwayLines.map((line) => (
                <img
                  key={line.name}
                  src={line.icon}
                  alt={line.name}
                  className={styles.lineIcon}
                />
              ))}
              <span>{venue.subwayDetail}</span>
            </span>
          </p>
        </div>

        <div className={styles.infoBlock}>
          <p className={styles.infoTitle}>버스</p>
          <p className={styles.busStop}>{venue.busStop}</p>
          <ul className={styles.busList}>
            {venue.busLines.map((line) => (
              <li key={line.label} className={styles.busLine}>
                <img src={line.icon} alt={line.label} className={styles.busIcon} />
                {line.text}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.infoBlockLast}>
          <p className={styles.infoTitle}>주차</p>
          {venue.parking.split("\n").map((line, i) => (
            <p key={i} className={styles.infoText}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
