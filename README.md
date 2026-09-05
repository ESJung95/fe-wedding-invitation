# fe-wedding-invitation

모바일 청첩장 프론트엔드입니다. 봉투 오프닝 인트로, 인사말, 캘린더, 오시는 길, 식장 안내, 축하 메시지, 마음 전하실 곳, 갤러리, 카카오톡 공유 기능을 제공하며, 개인화 링크로 접속하면 하객 이름이 표시됩니다.

## 기술 스택

- Next.js 16 (App Router, Server Components)
- React 19
- TypeScript
- CSS Modules
- Kakao JavaScript SDK (공유, 지도 연동)
- 배포: Vercel

## 실행 방법

```bash
npm install
npm run dev
```

개발 서버는 `http://localhost:3000`에서 실행됩니다.

| 스크립트 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint 검사 |

## 환경변수

`.env.example`을 참고해 `.env.local`을 생성합니다.

| 변수 | 설명 |
| --- | --- |
| `INVITATION_API_BASE_URL` | 백엔드 API 베이스 URL (예: `https://api.kihan-eunsun.site`) |

`NEXT_PUBLIC_` 접두사가 없으므로 이 값은 Next.js 서버에서만 사용되며 브라우저 번들에 포함되지 않습니다. 백엔드 호출은 모두 서버 컴포넌트 또는 Route Handler를 통해 이루어집니다.

## 라우트

| 경로 | 설명 |
| --- | --- |
| `/` | `/invite`로 리다이렉트 |
| `/invite` | 기본 청첩장. 인쇄된 청첩장의 QR코드가 가리키는 주소로, 개인화 없이 `accessType=QR`로 조회 기록만 남깁니다. |
| `/invite/[slug]` | 개인화 청첩장. `slug`는 하객별 token이며 `accessType=LINK`로 백엔드에 조회해 하객 이름을 받아옵니다. |
| `/api/message` | 축하 메시지 작성 프록시 (Route Handler). 브라우저 요청을 받아 백엔드로 전달합니다. |

### 개인화 링크와 폴백

`/invite/[slug]`의 token이 유효하지 않거나 백엔드 호출이 실패하면(환경변수 누락, 네트워크 오류, 타임아웃 등) 예외를 던지지 않고 기본 청첩장 화면으로 대체됩니다. 백엔드 조회에는 4초 타임아웃이 적용됩니다.

예시: `http://localhost:3000/invite/85f9e52c-e3ab-49aa-bf0e-2f4eb5a24ac3`

## 백엔드 연동

백엔드 레포지토리: [be-wedding-invitation](https://github.com/ESJung95/be-wedding-invitation)

### 청첩장 조회

- 백엔드 API: `GET /api/invitation?accessType={LINK|QR}&token={token}`
- 호출 위치: 서버 컴포넌트 (`src/lib/api/invitation.ts`)
- 응답의 `personalized`, `name`을 이용해 봉투 화면에 하객 이름을 표시합니다.

### 축하 메시지 작성

- 브라우저: `POST /api/message` (Next.js Route Handler)
- 백엔드: `POST /api/invitation/message`
- 요청 본문

```json
{
  "token": "하객 token (QR 접근 시 생략)",
  "accessType": "LINK 또는 QR",
  "guestName": "이름 (최대 50자)",
  "content": "메시지 본문"
}
```

Route Handler를 프록시로 두는 이유는 백엔드 URL을 브라우저에 노출하지 않고, 동일 출처 요청으로 처리해 CORS 설정에 의존하지 않기 위해서입니다. 백엔드 응답은 상태 코드와 본문을 그대로 전달하며, 프록시 자체 실패는 `PROXY_xxx` 코드로 구분됩니다.

토스트 문구 정책은 다음과 같습니다.

- 4xx: 백엔드가 내려준 `error.message`를 그대로 표시합니다. 검증 문구는 백엔드에서 단일 관리합니다.
- 5xx, 네트워크 오류: 프론트 고정 문구를 표시합니다.

token이 유효하지 않은 경우에도 token은 그대로 전송되며, 백엔드가 하객을 찾지 못하면 익명 메시지로 저장됩니다.

### 백엔드 응답 형식

```json
{
  "success": true,
  "data": {},
  "error": {
    "code": "COMMON_001",
    "message": "에러 메시지"
  }
}
```

`success`가 true이면 `error`가 생략되고, false이면 `data`가 생략됩니다.

## 디렉토리 구조

```
src/
  app/
    layout.tsx                 루트 레이아웃, 메타데이터
    page.tsx                   /invite 리다이렉트
    invite/
      page.tsx                 기본 청첩장 (QR)
      [slug]/page.tsx          개인화 청첩장 (LINK)
    api/
      message/route.ts         축하 메시지 프록시
  components/invitation/
    InvitationApp.tsx          전체 화면 조립, 인트로/본문 전환
    Envelope.tsx               봉투 오프닝 인트로
    Hero.tsx                   메인 이미지
    Greeting.tsx               인사말, 양가 가족
    Calendar.tsx               예식 일자, D-day
    Location.tsx               오시는 길, 지도 앱 연동
    VenueGuide.tsx             식장 안내 탭
    Message.tsx                축하 메시지 폼
    Account.tsx                마음 전하실 곳 (계좌)
    Gallery.tsx, Lightbox.tsx  갤러리
    Share.tsx                  카카오톡 공유, 링크 복사
    ToastContext.tsx           토스트 알림
  data/
    invitationContent.ts       청첩장 정적 콘텐츠 (이름, 일시, 장소, 계좌 등)
    guests.ts                  token으로 하객 조회
  lib/
    api/invitation.ts          백엔드 청첩장 조회
    integrations/
      messages.ts              축하 메시지 저장
      kakaoShare.ts            카카오톡 공유
      kakaoMap.ts, kakaoPay.ts 카카오 지도, 카카오페이
    calendar.ts, dday.ts       날짜 유틸
    mapLinks.ts                지도 앱 딥링크
    clipboard.ts               클립보드 복사
  types/invitation.ts          콘텐츠 타입 정의
public/images/                 히어로, 갤러리, 식장, 아이콘 이미지
```

## 콘텐츠 수정

신랑 신부 이름, 예식 일시, 장소, 계좌 정보, 인사말, 갤러리 이미지 목록 등은 모두 `src/data/invitationContent.ts`에서 관리합니다. 이미지는 `public/images/` 아래에 두고 해당 파일에서 경로를 참조합니다.
