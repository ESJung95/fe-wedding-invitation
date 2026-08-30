import Image from "next/image";
import TypingText from "./TypingText";
import styles from "./Hero.module.css";

interface HeroProps {
  groomName: string;
  brideName: string;
  heroImage: string;
}

export default function Hero({ groomName, brideName, heroImage }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.imageWrap}>
        <Image
          src={heroImage}
          alt={`${groomName} ${brideName} 커플 사진`}
          width={1200}
          height={1800}
          sizes="(max-width: 480px) 100vw, 480px"
          className={styles.image}
          priority
        />
        <div className={styles.overlay}>
          <p className={styles.subtitle}>Kihan &amp; Eunsun</p>
          <h1 className={styles.script}>
            <TypingText text="We're getting married" />
          </h1>
        </div>
      </div>
    </section>
  );
}
