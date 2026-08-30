import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "기한 · 은선 결혼식에 초대합니다",
  description: "2026년 12월 6일 일요일, 라온제나 강남에서 올리는 결혼식에 소중한 분들을 초대합니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
