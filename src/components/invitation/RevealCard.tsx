"use client";

import { useEffect, useState } from "react";
import styles from "./RevealCard.module.css";

interface RevealCardProps {
  groomName: string;
  brideName: string;
  phase: "cardPop" | "cardGrow" | "fadeOut";
}

export default function RevealCard({
  groomName,
  brideName,
  phase,
}: RevealCardProps) {
  const [popped, setPopped] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setPopped(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const isGrowing = phase === "cardGrow" || phase === "fadeOut";

  return (
    <div
      className={[
        styles.overlay,
        popped ? styles.popped : "",
        isGrowing ? styles.grow : "",
        phase === "fadeOut" ? styles.fadeOut : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={`${styles.text} ${isGrowing ? styles.textHidden : ""}`}
      >
        <span className={styles.names}>
          {groomName} <span className={styles.heart}>&#9825;</span>{" "}
          {brideName}
        </span>
        <span className={styles.invite}>결혼식에 초대합니다</span>
      </div>
    </div>
  );
}
