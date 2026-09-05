import styles from "./Summary.module.css";

interface SummaryProps {
  groomName: string;
  brideName: string;
  dateDisplay: string;
  timeDisplay: string;
  venueName: string;
}

export default function Summary({
  groomName,
  brideName,
  dateDisplay,
  timeDisplay,
  venueName,
}: SummaryProps) {
  return (
    <section className={styles.summary}>
      <div className={styles.names}>
        <span className={styles.name}>{groomName}</span>
        <span className={styles.dot} />
        <span className={styles.name}>{brideName}</span>
      </div>
      <p className={styles.date}>
        {dateDisplay} {timeDisplay}
      </p>
      <p className={styles.venue}>{venueName}</p>
    </section>
  );
}
