"use client";

import { useEffect, useState } from "react";
import styles from "./TypingText.module.css";

interface TypingTextProps {
  text: string;
  className?: string;
  startDelay?: number;
  speed?: number;
}

export default function TypingText({
  text,
  className,
  startDelay = 300,
  speed = 100,
}: TypingTextProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let charIndex = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        charIndex += 1;
        setVisibleCount(charIndex);
        if (charIndex >= text.length && intervalId) {
          clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, startDelay, speed]);

  const done = visibleCount >= text.length;

  return (
    <span className={className}>
      {text.slice(0, visibleCount)}
      <span className={`${styles.cursor} ${done ? styles.cursorDone : ""}`}>
        |
      </span>
    </span>
  );
}
