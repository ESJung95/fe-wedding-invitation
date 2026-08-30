import sectionStyles from "./Section.module.css";
import styles from "./Greeting.module.css";
import type { FamilyMember } from "@/types/invitation";

interface GreetingProps {
  message: string;
  groomName: string;
  brideName: string;
  groomFamily: FamilyMember;
  brideFamily: FamilyMember;
}

export default function Greeting({
  message,
  groomName,
  brideName,
  groomFamily,
  brideFamily,
}: GreetingProps) {
  return (
    <section className={sectionStyles.sec}>
      <h2 className={sectionStyles.title}>소중한 분들을 초대합니다</h2>
      <p className={styles.text}>
        {message.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </p>
      <div className={styles.families}>
        <div className={styles.familyCol}>
          <p className={styles.sideLabel}>신랑측</p>
          <p className={styles.parents}>{groomFamily.parents}</p>
          <p className={styles.role}>
            {groomFamily.role} <span className={styles.coupleName}>{groomName}</span>
          </p>
        </div>
        <div className={styles.divider} />
        <div className={styles.familyCol}>
          <p className={styles.sideLabel}>신부측</p>
          <p className={styles.parents}>{brideFamily.parents}</p>
          <p className={styles.role}>
            {brideFamily.role} <span className={styles.coupleName}>{brideName}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
