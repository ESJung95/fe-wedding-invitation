"use client";

import styles from "./Envelope.module.css";

interface EnvelopeProps {
  dateDisplay: string;
  guestName?: string;
  isOpening: boolean;
  onOpen: () => void;
}

export default function Envelope({
  dateDisplay,
  guestName,
  isOpening,
  onOpen,
}: EnvelopeProps) {
  const hidden = isOpening ? styles.flapHidden : "";

  return (
    <div className={styles.wrap}>
      <p className={styles.eyebrow}>{dateDisplay}</p>

      {guestName && (
        <p className={styles.addressee}>
          <span className={styles.to}>TO.</span> {guestName} 님
        </p>
      )}

      <div className={styles.envelope}>
        <div className={styles.body}>
          <div className={styles.inside} />

          <div className={`${styles.flapWrap} ${styles.flapLeftWrap} ${hidden}`}>
            <div className={`${styles.face} ${styles.flapLeft}`} />
          </div>
          <div className={`${styles.flapWrap} ${styles.flapRightWrap} ${hidden}`}>
            <div className={`${styles.face} ${styles.flapRight}`} />
          </div>
          <div className={`${styles.flapWrap} ${styles.flapBottomWrap} ${hidden}`}>
            <div className={`${styles.face} ${styles.flapBottom}`} />
          </div>
        </div>

        <div className={`${styles.flapTopWrap} ${isOpening ? styles.flapOpen : ""}`}>
          <div className={`${styles.face} ${styles.flapTop}`} />
        </div>

        {/* 금선 모노그램. 원 두 겹과 글자만으로 이루어진 인그레이빙 느낌의 봉인 */}
        <button
          type="button"
          className={`${styles.seal} ${isOpening ? styles.sealHidden : ""}`}
          onClick={onOpen}
          disabled={isOpening}
          aria-label="청첩장 열어보기"
        >
          <svg className={styles.sealArt} viewBox="0 0 60 60" aria-hidden="true">
            <circle cx="30" cy="30" r="28" className={styles.sealDisc} />
            <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" strokeWidth="0.9" />
            <text
              x="30"
              y="35.8"
              textAnchor="middle"
              fontSize="16.5"
              letterSpacing="0.4"
              className={styles.sealText}
            >
              클릭
            </text>
          </svg>
        </button>
      </div>

      <p className={styles.sub}>
        두 사람이 함께 걸어갈 첫 걸음에
        <br />
        귀한 걸음 하시어 축복해 주시면 감사하겠습니다
      </p>
    </div>
  );
}
