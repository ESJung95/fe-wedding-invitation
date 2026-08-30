"use client";

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
