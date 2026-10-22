# Mitsui Style 기업 홈페이지 기본 템플릿 (Vue.js + Node.js)

일본 미쓰이물산 한국 사이트([Mitsui & Co. Korea](https://www.mitsui.com/kr/ko/index.html))의 클래식하고 정갈한 기업형 레이아웃을 모델로 제작된 **Vue 3 + Node.js 기본 템플릿**입니다.

TailwindCSS와 같은 과도한 프레임워크나 불필요한 장식 없이, **순수 CSS와 직관적인 컴포넌트 구조**로 제작되어 누구나 쉽게 사진과 텍스트, 디자인을 커스텀할 수 있습니다.

---

## 📁 프로젝트 구조

```text
mitsui-template/
├── client/                     # Vue 3 프론트엔드 (Vite)
│   ├── public/
│   │   └── images/             # ★ 사진/이미지 파일 교체 폴더
│   │       ├── slide-steel.svg
│   │       ├── slide-chem.svg
│   │       ├── slide-energy.svg
│   │       ├── slide-food.svg
│   │       ├── card-company.svg
│   │       ├── card-business.svg
│   │       ├── card-careers.svg
│   │       └── card-presence.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── styles.css      # ★ 전체 스타일 및 테마 변수 (색상, 여백 등)
│   │   ├── components/
│   │   │   ├── Header.vue      # 헤더 (로고, 언어, 글로벌 네트워크, GNB 메뉴)
│   │   │   ├── HeroSlider.vue  # 메인 롤링 슬라이더 배너 (이전/다음, 도트, 자동재생)
│   │   │   ├── MainCards.vue   # 메인 2열 그리드 콘텐츠 카드 4종
│   │   │   ├── NoticeSection.vue # 결산공고 및 안내 섹션
│   │   │   └── Footer.vue      # 푸터 (사이트맵, TOP 이동 버튼, 저작권)
│   │   ├── App.vue             # 메인 앱 진입 컴포넌트
│   │   └── main.js
│   ├── index.html
│   └── vite.config.js
│
├── server/                     # Node.js 백엔드 (Express)
│   ├── server.js               # REST API (/api/navigation, /api/slides 등) 및 정적 서빙
│   └── package.json
│
├── package.json                # 전체 프로젝트 통합 실행 스크립트
└── README.md
```

---

## 🚀 실행 방법

### 1) 통합 실행 (권장)
프로젝트 루트 디렉토리(`mitsui-template`)에서 터미널을 열고 실행합니다:

```bash
# 백엔드 서버 실행 (포트 3000)
npm run dev:server

# 프론트엔드 개발 서버 실행 (포트 5173 - Hot Reloading 지원)
npm run dev:client
```

브라우저에서 `http://localhost:5173` 접속 시 실시간 개발 화면을 보실 수 있습니다.

### 2) 배포 빌드 및 Node.js 단독 실행
```bash
# 1. 프론트엔드 빌드 (client/dist 생성)
npm run build:client

# 2. Node.js 서버 실행
npm start
```
이후 `http://localhost:3000`으로 접속하면 Node.js 단독으로 완성된 웹사이트가 서빙됩니다.

---

## 🎨 사진 및 디자인 커스텀 가이드

### 1. 사진(이미지) 교체하기
`client/public/images/` 폴더에 원하는 사진을 넣고 파일명을 맞추거나, `App.vue` 또는 `server.js`의 이미지 경로를 수정하시면 됩니다.

* **메인 슬라이더 사진** (권장 규격: 1920x800 px)
  - `slide-steel.svg`
  - `slide-chem.svg`
  - `slide-energy.svg`
  - `slide-food.svg`
* **메인 2열 카드 사진** (권장 규격: 800x500 px)
  - `card-company.svg` (회사정보)
  - `card-business.svg` (사업소개)
  - `card-careers.svg` (채용정보)
  - `card-presence.svg` (Global Presence)

> **팁**: `.jpg`나 `.png` 사진을 넣으신 후 `App.vue`에서 `image: '/images/내사진.jpg'` 형태로 변경하시면 됩니다.

### 2. 색상 및 폰트 변경 (CSS 변수)
`client/src/assets/styles.css` 파일 최상단의 `:root` 변수만 수정하면 전체 사이트 톤앤매너가 즉시 변경됩니다:

```css
:root {
  --primary-color: #0b2545;  /* 메인 기업 대표 컬러 */
  --accent-color: #0077b6;   /* 포인트/링크 강조 컬러 */
  --text-main: #222222;      /* 본문 폰트 색상 */
  --bg-light: #f7f8fa;       /* 연한 배경 색상 */
  --font-family: 'Noto Sans KR', sans-serif; /* 기본 폰트 */
}
```

### 3. 메뉴 및 텍스트 데이터 수정
- **프론트엔드 단독 수정**: `client/src/App.vue`의 `navData`, `slides`, `cards`, `noticeData` ref 값을 수정합니다.
- **백엔드 API 연동 수정**: `server/server.js`의 `/api/...` 핸들러 내 JSON 객체를 수정하시면 프론트엔드가 이를 자동으로 불러옵니다.
