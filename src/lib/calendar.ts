export interface MonthGrid {
  year: number;
  month: number;
  weeks: (number | null)[][];
}

/**
 * 주어진 연/월(month는 1~12)의 달력 그리드를 계산합니다.
 * 일요일 시작 기준이며, 빈 칸은 null로 채웁니다.
 */
export function buildMonthGrid(year: number, month: number): MonthGrid {
  const firstDay = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const startWeekday = firstDay.getDay();

  const cells: (number | null)[] = [
    ...Array(startWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return { year, month, weeks };
}
