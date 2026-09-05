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
    mapSearchName: "라온제나 강남",
    address: "서울특별시 강남구 학동로47길 5 (논현2동 117-7)",
    subwayLines: [
      { name: "7호선", icon: "/images/icons/line-7-badge.jpg" },
      { name: "수인분당선", icon: "/images/icons/line-suin-bundang-badge.jpg" },
    ],
    subwayDetail: "강남구청역 3번 출구에서 도보 2분",
    busStop: "강남구청역 하차",
    busLines: [
      { label: "간선버스", icon: "/images/icons/bus-trunk-badge.jpg", text: "242, 301, 342, 401, 472" },
      { label: "지선버스", icon: "/images/icons/bus-branch-badge.jpg", text: "3011, 3414, 3426, 4312" },
      { label: "공항버스", icon: "/images/icons/bus-airport-badge.jpg", text: "6703 (서울세관 하차)" },
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
    parking: "건물 내 주차장 2시간 무료\n(7층 연회장에서 차량 등록 필수, 초과 10분당 800원)",
    latitude: 37.5175,
    longitude: 127.0473,
  },
  greeting: {
    message:
      "서로 다른 길을 걸어온 두 사람이\n이제 한 곳을 바라보며 걸어가려 합니다.\n바쁘시더라도 오셔서 축복해 주시면\n큰 힘이 되겠습니다.",
    groomFamily: {
      parents: "이민섭",
      role: "의 장남",
    },
    brideFamily: {
      parents: "정영철 · 양현숙",
      role: "의 장녀",
    },
  },
  flowerWreathNote: "참석이 어려우신 분들을 위해\n마음 전하실 곳을 마련하였습니다.\n\n축하 화환은 정중히 사양하오니\n보내주시는 마음만 감사히 받겠습니다.",
  heroImage: "/images/hero-main.jpg",
  closingImage: "/images/closing.jpg",
  accounts: {
    groom: [
      { relation: "신랑 아버지", name: "이민섭", bank: "하나은행", number: "348-890548-94507" },
      { relation: "신랑", name: "이기한", bank: "토스뱅크", number: "1001-9271-8184" },
    ],
    bride: [
      { relation: "신부 아버지", name: "정영철", bank: "국민은행", number: "623501-01-445879" },
      { relation: "신부 어머니", name: "양현숙", bank: "국민은행", number: "283-21-0010-170" },
      { relation: "신부", name: "정은선", bank: "국민은행", number: "623502-01-394132" },
    ],
  },
  venueGuide: [
    {
      type: "photo",
      id: "photobooth",
      label: "포토부스",
      image: "/images/venue/photozone.jpg",
      imageWidth: 1000,
      imageHeight: 667,
      description:
        "엘리베이터에서 내리시면 좌측 포토존에 위치해 있습니다.\n횟수 제한 없이 촬영하실 수 있습니다.",
    },
    {
      type: "photo",
      id: "brideroom",
      label: "신부대기실",
      image: "/images/venue/bride.jpg",
      imageWidth: 1000,
      imageHeight: 667,
      description: "엘리베이터에서 내리시면 우측 가장 안쪽에 있습니다.",
    },
    {
      type: "photo",
      id: "hall",
      label: "연회장",
      image: "/images/venue/restaurant.jpg",
      imageWidth: 1000,
      imageHeight: 667,
      description:
        "연회장은 7층에 있습니다.\n이용 시간은 12:00 ~ 14:00 이며,\n예식 30분 전부터 이용 가능합니다.",
    },
    {
      type: "info",
      id: "atm-parking",
      label: "ATM / 주차등록",
      items: [
        {
          title: "ATM",
          text: "엘리베이터에서 내리시면 우측 축의대 맞은편에 있습니다.",
        },
        {
          title: "주차 등록",
          text: "7층 연회장 입구에서 차량 등록을 해주세요.\n차량을 미등록시 출차가 불가능합니다.\n2시간 무료입니다.",
        },
        {
          title: "엘리베이터 안내",
          text: "엘리베이터가 협소하여 이용에 시간이 걸릴 수 있습니다.\n여유 있게 오시기를 부탁드립니다.",
        },
      ],
    },
  ],
  galleryImages: [
    { src: "/images/gallery/gallery-01.jpg", width: 1333, height: 2000 },
    { src: "/images/gallery/gallery-02.jpg", width: 1334, height: 2000 },
    { src: "/images/gallery/gallery-03.jpg", width: 1333, height: 2000 },
    { src: "/images/gallery/gallery-04.jpg", width: 2000, height: 1333 },
    { src: "/images/gallery/gallery-05.jpg", width: 2000, height: 1377 },
    { src: "/images/gallery/gallery-06.jpg", width: 1333, height: 2000 },
    { src: "/images/gallery/gallery-07.jpg", width: 2000, height: 1334 },
    { src: "/images/gallery/gallery-08.jpg", width: 2000, height: 1333 },
    { src: "/images/gallery/gallery-09.jpg", width: 1333, height: 2000 },
    { src: "/images/gallery/gallery-10.jpg", width: 1332, height: 2000 },
    { src: "/images/gallery/gallery-11.jpg", width: 2000, height: 1333 },
    { src: "/images/gallery/gallery-12.jpg", width: 1352, height: 2000 },
  ],
  shareLinkBase: "https://kihan-eunsun.site",
  shareTitle: "이기한 ❤️ 정은선 결혼식에 초대합니다",
  shareImage: "/images/share-thumbnail.jpg",
  kakaoJsKey: "5129d5519195d7b8fa5a3ceaece0879b",
};
