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
          <div
            className={`${styles.flapRight} ${isOpening ? styles.sideFlapHidden : ""}`}
          />
          <div
            className={`${styles.flapBottom} ${isOpening ? styles.sideFlapHidden : ""}`}
          />
          <div
            className={`${styles.flapLeft} ${isOpening ? styles.sideFlapHidden : ""}`}
          />
        </div>
        <div
          className={`${styles.flapTop} ${isOpening ? styles.flapOpen : ""}`}
        />
        <button
          className={`${styles.seal} ${isOpening ? styles.sealHidden : ""}`}
          onClick={onOpen}
          disabled={isOpening}
          aria-label="청첩장 열어보기"
        >
          클릭
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
