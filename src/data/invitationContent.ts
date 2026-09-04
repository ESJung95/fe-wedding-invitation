import type { InvitationContent } from "@/types/invitation";

/**
 * 청첩장에 노출되는 모든 문구와 정보를 이 파일에서 관리합니다.
 * 문구가 변경되면 컴포넌트 코드를 건드리지 않고 이 파일만 수정하면 됩니다.
 */
export const invitationContent: InvitationContent = {
  couple: {
    groomName: "기한",
    brideName: "은선",
  },
  weddingDateISO: "2026-12-06T12:30:00+09:00",
  weddingDateDisplay: "2026년 12월 6일 일요일",
  weddingTimeDisplay: "오후 12시 30분",
  venue: {
    name: "라온제나 강남 8층 플로렌스홀",
    address: "서울특별시 강남구 학동로47길 5 (논현2동 117-7)",
    subway: "7호선 · 분당선 강남구청역 하차, 3번 출구 직진 도보 150m",
    busStop: "강남구청역 하차",
    busLines: [
      "간선버스(파랑) 242, 301, 401",
      "지선버스(녹색) 3011, 3414, 3426, 4312",
      "공항버스 6703 (임페리얼팰리스호텔 하차)",
    ],
    carRoutes: [
      {
        title: "경부고속도로 이용 시",
        steps: [
          "반포IC 진입",
          "차병원교차로 좌회전",
          "학동역 우회전",
          "서울세관 사거리",
          "강남구청역 U턴 후 100m 직진",
          "영동한의원 우회전 후 10m",
        ],
      },
      {
        title: "영동고속도로 이용 시",
        steps: [
          "호법IC 진입, 중부고속도로 강일방면",
          "강일IC 올림픽대로 서울방면",
          "코엑스 방면, 코엑스교차로 우회전",
          "경기고교 앞 사거리 좌회전",
          "청담역 지나 강남구청역 100m 직진",
          "영동한의원 우회전 후 10m",
        ],
      },
    ],
    navAddress: "서울시 강남구 학동로47길 5",
    parking: "2시간 무료 (지하 4층~지상 6층)",
    latitude: 37.5175,
    longitude: 127.0473,
  },
  greeting: {
    message:
      "서로 다른 길을 걸어온 두 사람이\n이제 한 곳을 바라보며 걸어가려 합니다.\n바쁘시더라도 오셔서 축복해 주시면\n큰 힘이 되겠습니다.",
    groomFamily: {
      parents: "이민섭",
      role: "의 아들",
    },
    brideFamily: {
      parents: "정영철 · 양현숙",
      role: "의 딸",
    },
  },
  flowerWreathNote: "소중한 마음만 감사히 받겠습니다.\n\n축하 화환은 정중히 사양하오니\n너그러운 양해 부탁드립니다",
  heroImage: "/images/hero-main.jpg",
  closingImage: "/images/gallery/gallery-14.jpg",
  accounts: {
    groom: [
      { who: "신랑 아버지 이민섭", bank: "신한은행", number: "000-000-000000" },
      { who: "신랑 기한", bank: "국민은행", number: "000000-00-000000" },
    ],
    bride: [
      { who: "신부 아버지 정영철", bank: "국민은행", number: "623501-01-445879" },
      { who: "신부 어머니 양현숙", bank: "국민은행", number: "283-21-0010-170" },
      { who: "신부 은선", bank: "국민은행", number: "623502-01-394132" },
    ],
  },
  galleryImages: [
    { src: "/images/gallery/gallery-01.jpg", width: 3379, height: 5069 },
    { src: "/images/gallery/gallery-02.jpg", width: 3648, height: 5472 },
    { src: "/images/gallery/gallery-03.jpg", width: 3582, height: 5372 },
    { src: "/images/gallery/gallery-04.jpg", width: 3548, height: 5323 },
    { src: "/images/gallery/gallery-05.jpg", width: 3526, height: 5288 },
    { src: "/images/gallery/gallery-06.jpg", width: 3526, height: 5288 },
    { src: "/images/gallery/gallery-07.jpg", width: 3539, height: 5308 },
    { src: "/images/gallery/gallery-08.jpg", width: 3526, height: 5288 },
    { src: "/images/gallery/gallery-09.jpg", width: 3526, height: 5288 },
    { src: "/images/gallery/gallery-10.jpg", width: 5323, height: 3548 },
    { src: "/images/gallery/gallery-11.jpg", width: 5472, height: 3648 },
    { src: "/images/gallery/gallery-12.jpg", width: 5288, height: 3526 },
    { src: "/images/gallery/gallery-13.jpg", width: 3548, height: 5323 },
    { src: "/images/gallery/gallery-14.jpg", width: 3548, height: 4601 },
    { src: "/images/gallery/gallery-15.jpg", width: 3582, height: 5372 },
  ],
  shareLinkBase: "https://kihan-eunsun.site",
};
