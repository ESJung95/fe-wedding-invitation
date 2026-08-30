export function calculateDday(weddingDateISO: string): number {
  const wedding = new Date(weddingDateISO);
  wedding.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffMs = wedding.getTime() - today.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}
