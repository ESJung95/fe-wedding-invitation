"use client";

import { useState } from "react";
import Image from "next/image";
import sectionStyles from "./Section.module.css";
import styles from "./Gallery.module.css";
import Lightbox from "./Lightbox";
import type { GalleryImage } from "@/types/invitation";

interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className={sectionStyles.sec}>
      <h2 className={sectionStyles.title}>갤러리</h2>
      <div className={styles.grid}>
        {images.map((image, index) => (
          <button
            key={image.src}
            className={styles.item}
            onClick={() => setLightboxIndex(index)}
            aria-label={`갤러리 사진 ${index + 1} 크게 보기`}
          >
            <Image
              src={image.src}
              alt={`갤러리 사진 ${index + 1}`}
              fill
              sizes="(max-width: 480px) 33vw, 160px"
              style={{ objectFit: "cover" }}
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev === null ? 0 : (prev - 1 + images.length) % images.length
            )
          }
          onNext={() =>
            setLightboxIndex((prev) =>
              prev === null ? 0 : (prev + 1) % images.length
            )
          }
        />
      )}
    </section>
  );
}
