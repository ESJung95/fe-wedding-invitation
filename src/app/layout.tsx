import type { Metadata } from "next";
import "./globals.css";
import { invitationContent } from "@/data/invitationContent";

const shareTitle = "이기한 ♥ 정은선 결혼식에 초대합니다.";
const shareDescription = `${invitationContent.weddingDateDisplay} ${invitationContent.weddingTimeDisplay}`;

export const metadata: Metadata = {
  metadataBase: new URL(invitationContent.shareLinkBase),
  title: shareTitle,
  description: shareDescription,
  openGraph: {
    title: shareTitle,
    description: shareDescription,
    images: [
      {
        url: invitationContent.heroImage,
        width: 1200,
        height: 1800,
        alt: shareTitle,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
