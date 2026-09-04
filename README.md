# 기한 · 은선 모바일 청첩장

Next.js(App Router) + TypeScript + CSS Modules로 만든 모바일 청첩장 프로젝트입니다.

## 환경변수

`.env.example`을 참고해서 `.env.local`을 만들고 백엔드 API 주소를 넣습니다. `.env.local`은 Git에 커밋되지 않습니다.

```
INVITATION_API_BASE_URL=http://your-backend-host:port
```

이 값은 서버 컴포넌트에서만 사용되며 브라우저에 노출되지 않습니다.

## 로컬 개발

```
npm install
npm run dev
```

`http://localhost:3000` 접속 시 `/invite`로 자동 이동합니다.

- 기본 버전: `/invite`
- 하객 개인화 버전: `/invite/kimminjun` (예시 slug)

## 빌드 및 프로덕션 확인

```
npm run build
npm run start
```

## 문구 및 데이터 수정

모든 문구, 날짜, 장소, 계좌번호 등은 `src/data/invitationContent.ts` 한 파일에서 관리합니다. 이 파일만 수정하면 화면 전반에 반영됩니다.

## 하객별 개인화 링크

`/invite/[slug]`로 접속하면 `src/data/guests.ts`의 `getGuestBySlug`가 slug 값을 token으로 백엔드(`GET /api/invitation`)에 조회합니다. 하객 등록과 token 발급은 백엔드 관리자 API(`/api/admin/guests`)에서 이루어지며, 프론트엔드에서 직접 수정할 부분은 없습니다.

- 개인화 링크(`/invite/{token}`)는 accessType을 LINK로 고정해서 조회합니다.
- token 없이 접속하는 기본 경로(`/invite`)는 종이 청첩장 QR코드용으로 간주해 accessType을 QR로 고정하고, 조회 기록만 남기며 이름은 표시하지 않습니다.
- token이 유효하지 않거나 API 호출이 실패하면 별도 에러 화면 없이 기본(비개인화) 화면으로 대체됩니다.

## 갤러리 이미지 교체

`public/images/gallery/` 폴더에 `gallery-01.jpg`부터 순서대로 넣고, `src/data/invitationContent.ts`의 `galleryImages` 배열 길이는 이미지 개수에 맞춰 자동으로 계산됩니다. 장수를 늘리거나 줄여도 코드 수정 없이 이미지 파일만 교체하면 됩니다.

## 외부 연동 (카카오맵 / 카카오페이 / 카카오톡 공유 / 날씨 / 메시지 저장)

`src/lib/integrations/` 폴더에 기능별로 스텁 함수가 분리되어 있습니다. 지금은 실제 연동 없이 안내 메시지만 반환합니다. 백엔드가 배포되면 각 파일 내부 구현만 교체하면 되고, 이 함수를 호출하는 컴포넌트 쪽 코드는 수정할 필요가 없습니다.

- `kakaoShare.ts` : 카카오톡 공유, 링크 복사
- `kakaoPay.ts` : 카카오페이 송금, 계좌번호 복사
- `kakaoMap.ts` : 지도 표시
- `weather.ts` : 결혼식 날 날씨
- `messages.ts` : 축하 메시지 저장

## Vercel 배포

1. 이 프로젝트를 GitHub 저장소에 올립니다.
2. Vercel에서 New Project로 해당 저장소를 가져옵니다. 프레임워크는 Next.js로 자동 인식됩니다.
3. 별도의 환경 변수 없이 바로 빌드 및 배포가 가능합니다.
4. 배포 후 Vercel 프로젝트의 Settings > Domains에서 구매한 도메인을 연결합니다.
