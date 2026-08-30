import sectionStyles from "./Section.module.css";
import styles from "./Calendar.module.css";
import { buildMonthGrid } from "@/lib/calendar";

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

interface CalendarProps {
  groomName: string;
  brideName: string;
  dateDisplay: string;
  timeDisplay: string;
  venueName: string;
  weddingDateISO: string;
  dday: number;
}

export default function Calendar({
  groomName,
  brideName,
  dateDisplay,
  timeDisplay,
  venueName,
  weddingDateISO,
  dday,
}: CalendarProps) {
  const weddingDate = new Date(weddingDateISO);
  const year = weddingDate.getFullYear();
  const month = weddingDate.getMonth() + 1;
  const day = weddingDate.getDate();
  const { weeks } = buildMonthGrid(year, month);
  const ddayText = dday >= 0 ? `${dday}` : "완료";

  return (
    <section className={sectionStyles.sec}>
      <h2 className={styles.title}>예식 일시</h2>
      <p className={styles.dateTime}>
        {dateDisplay} {timeDisplay}
      </p>
      <p className={styles.venue}>{venueName}</p>

      <p className={styles.monthLabel}>{month}월</p>

      <div className={styles.card}>
        <div className={styles.weekdayRow}>
          {WEEKDAY_LABELS.map((label, i) => (
            <span
              key={label}
              className={
                i === 0
                  ? styles.sun
                  : i === 6
                  ? styles.sat
                  : styles.weekday
              }
            >
              {label}
            </span>
          ))}
        </div>
        {weeks.map((week, wi) => (
          <div className={styles.weekRow} key={wi}>
            {week.map((date, di) => (
              <span key={di} className={styles.dateCell}>
                {date && (
                  <span
                    className={date === day ? styles.dateActive : undefined}
                  >
                    {date}
                  </span>
                )}
              </span>
            ))}
          </div>
        ))}
      </div>

      <p className={styles.ddayText}>
        {groomName} <span className={styles.heart}>&#9825;</span> {brideName}
        의 결혼식까지 <b>{ddayText}</b>일 남았습니다
      </p>
    </section>
  );
}
