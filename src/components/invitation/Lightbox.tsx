"use client";

import { useEffect } from "react";
import Image from "next/image";
import styles from "./Lightbox.module.css";
import type { GalleryImage } from "@/types/invitation";

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const current = images[index];

  useEffect(() => {
    const scrollY = window.scrollY;
    const { body } = document;
    const original = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      body.style.overflow = original.overflow;
      body.style.position = original.position;
      body.style.top = original.top;
      body.style.width = original.width;
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <div className={styles.lightbox} onClick={onClose}>
      <button className={styles.close} onClick={onClose}>
        &times;
      </button>
      <button
        className={`${styles.nav} ${styles.prev}`}
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        &lsaquo;
      </button>
      <div className={styles.imageWrap} onClick={(e) => e.stopPropagation()}>
        <Image
          src={current.src}
          alt={`갤러리 사진 ${index + 1}`}
          width={current.width}
          height={current.height}
          sizes="90vw"
          className={styles.image}
        />
      </div>
      <button
        className={`${styles.nav} ${styles.next}`}
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        &rsaquo;
      </button>
      <div className={styles.count}>
        {index + 1} / {images.length}
      </div>
    </div>
  );
}
