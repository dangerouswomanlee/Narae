# 🎸 나래 (Narae)

**밴드 동아리를 위한 합주실 예약 및 팀 모집 웹 서비스**

비회원제 경량 구조로, 별도 로그인 없이 팀명 + 비밀번호만으로 예약·수정·삭제가 가능합니다.  
합주 예약, 팀원 모집, 공지사항 세 가지 핵심 기능을 하나의 플랫폼에서 제공합니다.

---

## 📸 스크린샷

합주 예약
<img width="1874" alt="합주 예약 페이지" src="https://github.com/user-attachments/assets/a0d11d79-0bb1-4ae9-bef9-e19e921a98ce" />
예약 생성 모달예약 생성 모달 (색상 선택)<img width="476" alt="예약 생성 모달" src="https://github.com/user-attachments/assets/8ba2772d-0d21-4604-9361-8ca8b5f608bf" /><img width="478" alt="예약 생성 모달 색상" src="https://github.com/user-attachments/assets/9195691d-30d2-46d6-b357-f1da0f93d9ef" />
<img width="497" alt="예약 상세 모달" src="https://github.com/user-attachments/assets/8662f74a-1b03-4398-ad43-2b1abf67a38e" />

팀 모집
<img width="1901" alt="팀 모집 목록" src="https://github.com/user-attachments/assets/737c5a1e-fecc-44c5-85d9-8f63eaf5e7b2" />
팀 모집 글 작성 모달팀 모집 상세 모달<img width="546" alt="팀 모집 글 작성" src="https://github.com/user-attachments/assets/71ce1e94-9ab3-457d-a7ba-686916de7fa8" /><img width="547" alt="팀 모집 상세" src="https://github.com/user-attachments/assets/3566398a-be64-4a74-a42e-92cf2f9a8e56" />

공지사항 & 레이아웃
<img width="1914" alt="공지사항 목록" src="https://github.com/user-attachments/assets/1d5d9098-4be1-4634-b532-75a406640d62" />
<img width="267" alt="사이드바 모바일 레이아웃" src="https://github.com/user-attachments/assets/df6178a5-2249-470f-bdb1-3df092e888b5" />

---

## ✨ 주요 기능

### 1. 합주 예약
- **날짜별 타임테이블** — 미니 캘린더에서 날짜를 선택하면 해당 날의 09:00 ~ 24:00 타임슬롯을 시각적으로 확인
- **빠른 예약** — 빈 타임슬롯 클릭 시 해당 시간으로 자동 세팅된 모달 팝업
- **예약 시 입력 항목** — 팀명, 시작 시간, 종료 시간, 비밀번호 (4자리), 색상 선택
- **예약 수정 / 삭제** — 예약 블록 클릭 → 비밀번호 인증 후 수정 또는 취소 가능
- **실시간 통계** — 선택된 날짜의 예약 건수, 예약된 총 시간, 남은 가용 시간을 카드로 표시
- **오늘/내일 뱃지** — 선택 날짜가 오늘 또는 내일인 경우 자동 강조 표시

### 2. 팀 모집
- **모집 글 작성** — 제목, 합주 곡명, 상세 내용, 작성자명, 파트 구성 입력
- **파트 구성** — 보컬·기타·베이스·드럼·키보드 프리셋 + 커스텀 파트 추가, 파트별 모집 인원 수 조절
- **신청 / 취소** — 파트별로 이름을 입력하여 신청, 비밀번호 없이 신청자 이름으로 취소
- **모집 마감 토글** — 작성자(비밀번호 인증)가 모집 상태를 수동으로 열기/닫기
- **필터 탭** — 전체 / 모집중 / 마감 세 가지로 게시글 분류
- **통계 카드** — 전체·모집중·마감 게시글 수 요약 표시
- **게시글 삭제** — 비밀번호 인증 후 삭제

### 3. 공지사항
- **공지 작성 / 수정 / 삭제** — 제목, 내용, 상단 고정 여부(토글) 설정
- **상단 고정** — 아이콘과 함께 일반 공지 위에 우선 표시
- **작성일 / 수정일 표시** — 수정된 공지에는 "(수정됨)" 표시
- **클릭하여 상세 보기** — 공지 카드 클릭 시 본문 전체를 모달로 확인

---

## 🛠 기술 스택

| 구분 | 기술 | 버전 |
|------|------|------|
| **Frontend** | React | 18 |
| | Vite | - |
| | Tailwind CSS | - |
| | Framer Motion | - |
| | Axios | - |
| | date-fns | - |
| **Backend** | Spring Boot | 3.2.0 |
| | Spring Security | - |
| | Spring Data JPA | - |
| | Spring Validation | - |
| | Lombok | - |
| **Database** | PostgreSQL (운영) / MySQL (로컬 SQL 스크립트) | - |
| **빌드** | Maven | - |
| **배포** | Docker | - |

---

## 🗂 프로젝트 구조

```
Narae/
├── src/main/java/com/narae/
│   ├── NaraeApplication.java         # 애플리케이션 진입점
│   ├── config/
│   │   ├── SecurityConfig.java       # Spring Security / CORS 설정
│   │   └── GlobalExceptionHandler.java
│   ├── controller/
│   │   ├── ReservationController.java
│   │   ├── BandPostController.java
│   │   └── NoticeController.java
│   ├── service/
│   │   ├── ReservationService.java
│   │   ├── BandPostService.java
│   │   └── NoticeService.java
│   ├── entity/
│   │   ├── Reservation.java
│   │   ├── BandPost.java
│   │   ├── BandPart.java
│   │   ├── BandParticipant.java
│   │   └── Notice.java
│   ├── repository/                   # Spring Data JPA Repository
│   └── dto/                          # Request / Response DTO
│
├── src/main/resources/
│   └── application.properties        # DB·포트·CORS 환경변수 설정
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                   # 라우팅
│   │   ├── pages/
│   │   │   ├── ReservationPage.jsx
│   │   │   ├── BandPage.jsx
│   │   │   └── NoticePage.jsx
│   │   ├── components/
│   │   │   ├── Reservation/
│   │   │   │   ├── MiniCalendar.jsx
│   │   │   │   ├── TimeTable.jsx
│   │   │   │   ├── ReservationModal.jsx
│   │   │   │   └── ReservationDetailModal.jsx
│   │   │   ├── Band/
│   │   │   │   ├── BandPostCard.jsx
│   │   │   │   ├── BandPostDetail.jsx
│   │   │   │   └── CreateBandPost.jsx
│   │   │   ├── Layout/
│   │   │   │   └── Sidebar.jsx
│   │   │   └── Toast.jsx
│   │   └── services/
│   │       └── api.js                # Axios 인스턴스 및 API 함수 모음
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── narae_db.sql                      # MySQL 초기화 스크립트 (로컬 개발용)
├── Dockerfile                        # 백엔드 빌드 및 실행 이미지
└── pom.xml
```

---

## 🚀 실행 방법

### 사전 준비

- Java 17+
- Node.js 18+
- PostgreSQL 또는 MySQL

---

### 1. 데이터베이스 설정

#### MySQL 사용 시 (로컬 개발)

```sql
-- narae_db.sql 파일을 실행하거나 아래 명령어 사용
mysql -u root -p < narae_db.sql
```

제공된 `narae_db.sql`에는 테이블 생성 + 샘플 공지·밴드 게시글이 포함되어 있습니다.

#### PostgreSQL 사용 시 (운영/배포 기본값)

```sql
CREATE DATABASE narae_db;
```

---

### 2. 백엔드 환경변수 설정

`src/main/resources/application.properties`에서 아래 항목을 수정하거나,  
실행 시 환경변수로 주입합니다.

```properties
# DB 연결 (기본값: PostgreSQL localhost)
spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:5432/narae_db}
spring.datasource.username=${DB_USERNAME:postgres}
spring.datasource.password=${DB_PASSWORD:}

# 서버 포트 (기본 8080)
server.port=${PORT:8080}

# CORS 허용 오리진
app.cors.allowed-origins=${CORS_ALLOWED_ORIGINS:http://localhost:5173,http://localhost:3000}
```

MySQL로 변경할 경우 `pom.xml`의 PostgreSQL 드라이버를 MySQL 드라이버로 교체하고  
`driver-class-name`, `jpa.database-platform`도 함께 수정해야 합니다.

---

### 3. 백엔드 실행

Eclipse에서 `NaraeApplication.java`를 Run As > Spring Boot App으로 실행하거나,  
터미널에서 아래 명령어를 사용합니다.

```bash
./mvnw spring-boot:run
```

백엔드는 `http://localhost:8080` 에서 실행됩니다.

---

### 4. 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

---

### 5. Docker로 백엔드 실행 (선택)

```bash
# 이미지 빌드
docker build -t narae-backend .

# 컨테이너 실행 (환경변수 주입)
docker run -p 8080:8080 \
  -e DB_URL=jdbc:postgresql://host.docker.internal:5432/narae_db \
  -e DB_USERNAME=postgres \
  -e DB_PASSWORD=비밀번호 \
  -e CORS_ALLOWED_ORIGINS=http://localhost:5173 \
  narae-backend
```

---

## 📡 API 엔드포인트

### 합주 예약 `/api/reservations`

| 메서드 | 경로 | 설명 |
|--------|------|------|
| `GET` | `/api/reservations?date=YYYY-MM-DD` | 날짜별 예약 목록 조회 |
| `POST` | `/api/reservations` | 예약 생성 |
| `POST` | `/api/reservations/{id}/verify` | 비밀번호 인증 |
| `PUT` | `/api/reservations/{id}` | 예약 수정 |
| `DELETE` | `/api/reservations/{id}` | 예약 삭제 |

### 팀 모집 `/api/band-posts`

| 메서드 | 경로 | 설명 |
|--------|------|------|
| `GET` | `/api/band-posts` | 전체 게시글 목록 |
| `GET` | `/api/band-posts/{id}` | 게시글 상세 조회 |
| `POST` | `/api/band-posts` | 게시글 작성 |
| `PUT` | `/api/band-posts/{id}` | 게시글 수정 |
| `DELETE` | `/api/band-posts/{id}` | 게시글 삭제 |
| `POST` | `/api/band-posts/{id}/verify-password` | 비밀번호 인증 |
| `POST` | `/api/band-posts/{id}/parts/{partId}/join` | 파트 신청 |
| `DELETE` | `/api/band-posts/{postId}/participants/{participantId}` | 신청 취소 |
| `PATCH` | `/api/band-posts/{id}/toggle-close` | 모집 상태 토글 |

### 공지사항 `/api/notices`

| 메서드 | 경로 | 설명 |
|--------|------|------|
| `GET` | `/api/notices` | 공지 목록 조회 |
| `GET` | `/api/notices/{id}` | 공지 상세 조회 |
| `POST` | `/api/notices` | 공지 작성 |
| `PUT` | `/api/notices/{id}` | 공지 수정 |
| `DELETE` | `/api/notices/{id}` | 공지 삭제 |

---

## 🗄 데이터베이스 스키마

```
reservation          band_post
──────────────       ──────────────────
id (PK)              id (PK)
team_name            title
reservation_date     song_name
start_time           content
end_time             author_name
password             password
color_index          is_closed
created_at           created_at
                         │
                     band_part          band_participant
                     ──────────         ───────────────
                     id (PK)            id (PK)
                     post_id (FK)       part_id (FK)
                     part_name          participant_name
                     max_count          created_at

notice
──────────────
id (PK)
title
content
is_pinned
created_at
updated_at
```

---

## 🔒 보안 구조

- 로그인 없는 **비회원 구조** — 예약·게시글 생성 시 설정한 비밀번호로 본인 인증
- 비밀번호는 **BCrypt 해시**로 저장 (Spring Security `PasswordEncoder`)
- Spring Security는 정적 리소스 및 `/api/**` 전체를 permit하도록 설정 (CSRF 비활성화)
- CORS는 `application.properties`의 `app.cors.allowed-origins` 환경변수로 제어

---

## 📝 개발 참고사항

- 프론트엔드 API 기본 URL은 `VITE_API_BASE_URL` 환경변수로 변경 가능  
  (미설정 시 `/api` 상대 경로 사용 — Vite 프록시 또는 Nginx reverse proxy 필요)
- `vite.config.js`에서 개발 시 `/api` → `http://localhost:8080` 프록시 설정 확인
- 운영 배포 시 프론트엔드를 빌드(`npm run build`)하여 백엔드 static resource 경로에 배치하거나,  
  별도 서버(Nginx 등)에서 서빙하고 CORS 오리진을 환경변수로 설정
