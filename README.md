# 나래 (Narae)

밴드 동아리를 위한 합주실 예약 및 팀 모집 웹 서비스입니다. 비회원제 경량 구조로, 별도 로그인 없이 팀명과 비밀번호만으로 예약을 만들고 수정·삭제할 수 있습니다. 합주 예약, 팀원 모집, 공지사항 세 가지 기능을 하나의 플랫폼에서 제공합니다.

배포 URL: https://narae-ruddy.vercel.app

<table>
  <tr>
    <th colspan="2" align="left">합주 예약 — 전체 화면</th>
  </tr>
  <tr>
    <td colspan="2">
      <img src="https://github.com/user-attachments/assets/a0d11d79-0bb1-4ae9-bef9-e19e921a98ce" width="100%" />
    </td>
  </tr>
  <tr>
    <th colspan="2" align="left">예약 생성 모달</th>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="https://github.com/user-attachments/assets/8ba2772d-0d21-4604-9361-8ca8b5f608bf" width="100%" />
    </td>
    <td align="center" width="50%">
      <img src="https://github.com/user-attachments/assets/9195691d-30d2-46d6-b357-f1da0f93d9ef" width="100%" />
    </td>
  </tr>
 <tr>
    <th colspan="2" align="left">예약 상세 · 수정 · 삭제 모달</th>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="https://github.com/user-attachments/assets/8662f74a-1b03-4398-ad43-2b1abf67a38e" width="100%" />
    </td>
    <td align="center" width="50%">
      <img src="https://github.com/user-attachments/assets/b56a08d6-e639-433b-9e3f-1c987192adfd" width="100%" />
    </td>
  </tr>
</table>
<table>
  <tr>
    <th colspan="2" align="left">팀 모집 — 전체 화면</th>
  </tr>
  <tr>
    <td colspan="2">
      <img src="https://github.com/user-attachments/assets/737c5a1e-fecc-44c5-85d9-8f63eaf5e7b2" width="100%" />
    </td>
  </tr>
  <tr>
    <th align="center">모집 글 작성 모달</th>
    <th align="center">모집 상세 모달</th>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="https://github.com/user-attachments/assets/71ce1e94-9ab3-457d-a7ba-686916de7fa8" width="100%" />
    </td>
    <td align="center" width="50%">
      <img src="https://github.com/user-attachments/assets/3566398a-be64-4a74-a42e-92cf2f9a8e56" width="100%" />
    </td>
  </tr>
</table>
<table>
  <tr>
    <th colspan="2" align="left">공지사항 &amp; 레이아웃 — 전체 화면</th>
  </tr>
  <tr>
    <td colspan="2">
      <img src="https://github.com/user-attachments/assets/1d5d9098-4be1-4634-b532-75a406640d62" width="100%" />
    </td>
  </tr>
  <tr>
    <th align="left">사이드바 / 모바일 레이아웃</th>
    <td></td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/df6178a5-2249-470f-bdb1-3df092e888b5" width="30%" />
    </td>
    <td></td>
  </tr>
</table>

## 주요 기능

### 1. 합주 예약

미니 캘린더에서 날짜를 선택하면 09:00~24:00 타임슬롯이 표로 보이고, 빈 슬롯을 클릭하면 해당 시간으로 자동 세팅된 모달이 뜹니다. 예약 시 팀명, 시작·종료 시간, 4자리 비밀번호, 색상을 입력하며, 예약 블록을 클릭한 뒤 비밀번호를 확인하면 수정하거나 취소할 수 있습니다. 선택한 날짜의 예약 건수, 예약된 총 시간, 남은 가용 시간은 카드로 보여주고, 오늘/내일 날짜에는 뱃지가 자동으로 붙습니다.

### 2. 팀 모집

제목, 합주 곡명, 상세 내용, 작성자명, 파트 구성을 입력해 모집 글을 작성합니다. 보컬·기타·베이스·드럼·키보드는 프리셋으로 제공하고 커스텀 파트도 추가할 수 있으며, 파트별 모집 인원도 조절 가능합니다. 신청은 파트에 이름만 입력하면 되고, 취소는 비밀번호 없이 신청자 이름으로 처리됩니다. 작성자는 비밀번호 인증 후 모집 상태를 열고 닫을 수 있고, 전체/모집중/마감 탭으로 게시글을 필터링할 수 있습니다. 삭제는 비밀번호 인증이 필요합니다.

### 3. 공지사항

제목, 내용, 상단 고정 여부를 설정해 작성·수정·삭제할 수 있습니다. 상단 고정된 공지는 일반 공지보다 위에 표시되고, 수정된 공지에는 "(수정됨)" 표시가 붙습니다. 공지 카드를 클릭하면 본문 전체를 모달로 볼 수 있습니다.

## 기술 스택

| 구분 | 기술 | 버전 |
|------|------|------|
| Frontend | React | 18 |
| | Vite | - |
| | Tailwind CSS | - |
| | Framer Motion | - |
| | Axios | - |
| | date-fns | - |
| Backend | Spring Boot | 3.2.0 |
| | Spring Security | - |
| | Spring Data JPA | - |
| | Spring Validation | - |
| | Lombok | - |
| Database | PostgreSQL (운영) / MySQL (로컬 SQL 스크립트) | - |
| 빌드 | Maven | - |
| 배포 | Docker | - |

## 프로젝트 구조

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

## 실행 방법

Java 17+, Node.js 18+, PostgreSQL 또는 MySQL이 필요합니다.

### 1. 데이터베이스 설정

로컬에서 MySQL을 쓴다면 `narae_db.sql`을 실행합니다. 테이블 생성과 함께 샘플 공지·밴드 게시글도 들어 있습니다.

```sql
mysql -u root -p < narae_db.sql
```

운영/배포 기본값인 PostgreSQL을 쓴다면 데이터베이스만 미리 만들어두면 됩니다.

```sql
CREATE DATABASE narae_db;
```

### 2. 백엔드 환경변수 설정

`src/main/resources/application.properties`에서 아래 항목을 수정하거나 실행 시 환경변수로 주입합니다.

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

MySQL로 바꾸려면 `pom.xml`의 PostgreSQL 드라이버를 MySQL 드라이버로 교체하고, `driver-class-name`과 `jpa.database-platform`도 함께 수정해야 합니다.

### 3. 백엔드 실행

Eclipse에서 `NaraeApplication.java`를 Run As > Spring Boot App으로 실행하거나, 터미널에서 아래 명령어를 사용합니다.

```bash
./mvnw spring-boot:run
```

백엔드는 `http://localhost:8080`에서 실행됩니다.

### 4. 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속합니다.

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

## API 엔드포인트

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

## 데이터베이스 스키마

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

## 보안 구조

로그인 없는 비회원 구조라, 예약이나 게시글을 만들 때 설정한 비밀번호로 본인 인증을 합니다. 비밀번호는 Spring Security의 `PasswordEncoder`로 BCrypt 해시 처리해 저장하고, Spring Security는 정적 리소스와 `/api/**` 전체를 permit하도록 설정하고 CSRF는 비활성화했습니다. CORS는 `application.properties`의 `app.cors.allowed-origins` 환경변수로 제어합니다.

## 개발 참고사항

프론트엔드 API 기본 URL은 `VITE_API_BASE_URL` 환경변수로 바꿀 수 있습니다. 설정하지 않으면 `/api` 상대 경로를 쓰는데, 이 경우 Vite 프록시나 Nginx reverse proxy가 필요합니다. 개발 중에는 `vite.config.js`에서 `/api` → `http://localhost:8080` 프록시 설정을 확인하면 됩니다. 운영 배포 시에는 프론트엔드를 빌드(`npm run build`)해서 백엔드 static resource 경로에 두거나, 별도 서버(Nginx 등)에서 서빙하고 CORS 오리진을 환경변수로 설정합니다.
