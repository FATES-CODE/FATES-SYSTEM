# CHO&Company Web — Vue.js + Node.js + MongoDB

**cho-co.jp** 스타일의 IT 솔루션 기업 웹사이트 클론 프로젝트

---

## 🚀 빠른 시작

### 1. 서버 실행 (포트 5000)
```bash
cd server
node server.js
```

### 2. 클라이언트 실행 (포트 5173)
```bash
cd client
npm run dev
```

> 브라우저에서 **http://localhost:5173** 열기

---

## 📁 프로젝트 구조

```
cho-company-web/
│
├── server/                      # Node.js + Express API
│   ├── config/
│   │   └── db.js                # MongoDB 연결 + 인메모리 폴백
│   ├── models/
│   │   ├── News.js              # 뉴스 스키마
│   │   ├── Product.js           # 제품 스키마
│   │   └── Inquiry.js           # 문의 스키마
│   ├── controllers/
│   │   ├── newsController.js
│   │   ├── productController.js
│   │   └── inquiryController.js
│   ├── routes/
│   │   ├── newsRoutes.js
│   │   ├── productRoutes.js
│   │   └── inquiryRoutes.js
│   ├── seedData.js              # 초기 시드 데이터
│   ├── server.js                # Express 메인 진입점
│   ├── .env                     # 환경변수
│   └── package.json
│
└── client/                      # Vue 3 + Vite + TailwindCSS
    ├── src/
    │   ├── api/
    │   │   └── index.js         # Axios API 클라이언트
    │   ├── components/
    │   │   ├── Navbar.vue       # 반응형 내비게이션
    │   │   ├── HeroSection.vue  # 메인 히어로 + 슬라이드쇼
    │   │   ├── NewsSection.vue  # 뉴스 목록 (API 연동)
    │   │   ├── ConceptSection.vue    # 경영이념 섹션
    │   │   ├── ProductsSection.vue   # 제품 그리드 + 모달
    │   │   ├── BusinessVisionSection.vue  # 비즈니스/비전
    │   │   ├── TeamProfileSection.vue     # 팀/회사 프로필
    │   │   ├── ContactModal.vue      # 문의 모달 (API 연동)
    │   │   └── Footer.vue
    │   ├── App.vue
    │   ├── main.js
    │   └── style.css
    ├── vite.config.js           # Vite + API 프록시 설정
    ├── tailwind.config.js
    └── package.json
```

---

## 🔌 API 엔드포인트

| Method | Path | 설명 |
|--------|------|------|
| `GET` | `/api/status` | 서버 상태 및 DB 연결 정보 |
| `GET` | `/api/news` | 뉴스 목록 전체 |
| `POST` | `/api/news` | 뉴스 등록 |
| `GET` | `/api/products` | 제품 목록 (`?category=xxx` 필터 가능) |
| `GET` | `/api/products/:id` | 제품 상세 |
| `POST` | `/api/inquiries` | 문의 등록 |
| `GET` | `/api/inquiries` | 문의 목록 (관리자용) |

---

## 🗃️ MongoDB 연결

`.env` 파일에서 설정:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/cho_company
PORT=5000
```

> **MongoDB가 없어도 동작합니다!**  
> MongoDB 연결 실패 시 자동으로 **인메모리 폴백 모드**로 전환됩니다.  
> 나중에 MongoDB를 설치하면 `.env`만 변경하면 자동 연동됩니다.

---

## 🎨 디자인 특징

- **Dark 모드** 기반 (cho-co.jp 스타일의 다크 네이비/슬레이트 팔레트)
- **Tailwind CSS** — 완전 반응형 (모바일 우선)
- 히어로 섹션 자동 슬라이드쇼 (4초 전환)
- 제품 카드 그리드 + **카테고리 필터** + **상세 모달**
- 뉴스 섹션 더보기/접기 기능
- 비즈니스 파트너십 + Vision 타임라인
- 팀 카드 스택 시각화
- **Contact 모달** — 폼 검증, 문의 타입 선택, API 전송
- 스크롤 투 탑 FAB
- ESC 키로 모달 닫기

---

## 🔧 나중에 MongoDB 바꿀 때

1. MongoDB 설치 후 `mongod` 실행
2. `server/.env`에서 `MONGODB_URI` 확인 (기본값 그대로 사용 가능)
3. 서버 재시작 → 자동으로 컬렉션 생성 + 시드 데이터 삽입

```bash
# MongoDB Atlas (클라우드) 사용 시
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/cho_company
```

---

## 📦 기술 스택

| Layer | Stack |
|-------|-------|
| Frontend | Vue 3 (Composition API) + Vite 5 |
| Styling | Tailwind CSS 3 |
| HTTP Client | Axios |
| Backend | Node.js 24 + Express 4 |
| Database | MongoDB + Mongoose (인메모리 폴백 포함) |
| Dev Proxy | Vite `/api` → `localhost:5000` |
