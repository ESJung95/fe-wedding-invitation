import Image from "next/image";
import styles from "./Footer.module.css";

interface FooterProps {
  groomName: string;
  brideName: string;
  closingImage: string;
}

export default function Footer({
  groomName,
  brideName,
  closingImage,
}: FooterProps) {
  return (
    <footer className={styles.foot}>
      <div className={styles.imageWrap}>
        <Image
          src={closingImage}
          alt={`${groomName} ${brideName} 마무리 인사 사진`}
          width={3548}
          height={4601}
          sizes="(max-width: 480px) 100vw, 480px"
          className={styles.image}
        />
      </div>
      <p className={styles.message}>
        {groomName} · {brideName}의 결혼식에
        <br />
        걸음 하여 주셔서 진심으로 감사드립니다.
      </p>
    </footer>
  );
}
