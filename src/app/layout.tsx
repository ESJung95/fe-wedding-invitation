import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { invitationContent } from "@/data/invitationContent";

const shareDescription = `${invitationContent.weddingDateDisplay} ${invitationContent.weddingTimeDisplay}`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(invitationContent.shareLinkBase),
  title: invitationContent.shareTitle,
  description: shareDescription,
  openGraph: {
    title: invitationContent.shareTitle,
    description: shareDescription,
    images: [
      {
        url: invitationContent.shareImage,
        width: 1200,
        height: 799,
        alt: invitationContent.shareTitle,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.8.3/kakao.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
