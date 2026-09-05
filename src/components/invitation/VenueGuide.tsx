"use client";

import { useState } from "react";
import Image from "next/image";
import sectionStyles from "./Section.module.css";
import styles from "./VenueGuide.module.css";
import type { VenueGuideTab } from "@/types/invitation";

function renderMultiline(text: string, lineClassName: string) {
  return text.split("\n\n").map((paragraph, pi) => (
    <p key={pi} className={lineClassName}>
      {paragraph.split("\n").map((line, li, arr) => (
        <span key={li}>
          {line}
          {li < arr.length - 1 && <br />}
        </span>
      ))}
    </p>
  ));
}

interface VenueGuideProps {
  tabs: VenueGuideTab[];
}

export default function VenueGuide({ tabs }: VenueGuideProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  if (!active) return null;

  return (
    <section className={sectionStyles.sec}>
      <h2 className={sectionStyles.title}>식장 안내</h2>

      <div className={styles.tabBar} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={tab.id === active.id}
            className={`${styles.tabBtn} ${
              tab.id === active.id ? styles.tabBtnActive : ""
            }`}
            onClick={() => setActiveId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active.type === "photo" ? (
        <div className={styles.photoPanel}>
          <div className={styles.imageWrap}>
            <Image
              src={active.image}
              alt={active.label}
              width={active.imageWidth}
              height={active.imageHeight}
              sizes="(max-width: 480px) 100vw, 480px"
              className={styles.image}
            />
          </div>
          {renderMultiline(active.description, styles.caption)}
        </div>
      ) : (
        <div className={styles.infoPanel}>
          {active.items.map((item) => (
            <div key={item.title} className={styles.infoItem}>
              <p className={styles.infoTitle}>{item.title}</p>
              {renderMultiline(item.text, styles.infoText)}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
