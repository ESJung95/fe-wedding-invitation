"use client";

import sectionStyles from "./Section.module.css";
import styles from "./Share.module.css";
import { useToast } from "./ToastContext";
import { copyShareLink, shareToKakao } from "@/lib/integrations/kakaoShare";

interface ShareProps {
  shareLink: string;
  kakaoJsKey: string;
  shareTitle: string;
  shareDescription: string;
  shareImage: string;
}

export default function Share({
  shareLink,
  kakaoJsKey,
  shareTitle,
  shareDescription,
  shareImage,
}: ShareProps) {
  const { showToast } = useToast();

  async function handleKakaoShare() {
    const result = await shareToKakao({
      jsKey: kakaoJsKey,
      title: shareTitle,
      description: shareDescription,
      imageUrl: shareImage,
      link: shareLink,
    });
    if (result.message) {
      showToast(result.message);
    }
  }

  async function handleCopyLink() {
    const result = await copyShareLink(shareLink);
    showToast(result.message);
  }

  return (
    <section className={sectionStyles.sec}>
      <h2 className={sectionStyles.title}>이 소식을 전해주세요</h2>
      <div className={styles.buttons}>
        <button className={`${styles.btn} ${styles.kakao}`} onClick={handleKakaoShare}>
          카카오톡으로 공유하기
        </button>
        <button className={`${styles.btn} ${styles.copy}`} onClick={handleCopyLink}>
          청첩장 링크 복사하기
        </button>
      </div>
    </section>
  );
}
