"use client";

import { useEffect, useState } from "react";
import styles from "./SealOverlay.module.css";

interface SealOverlayProps {
  phase: "expanding" | "revealing";
}

export default function SealOverlay({ phase }: SealOverlayProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setActive(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={[
        styles.overlay,
        active ? styles.active : "",
        phase === "revealing" ? styles.fadeOut : "",
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
