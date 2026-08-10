# 나래 (Narae)

밴드 동아리를 위한 합주실 예약 및 팀 모집 웹 서비스입니다.
비회원제 구조라서 별도 로그인 없이 팀명과 비밀번호만으로 예약을 만들고, 수정하고, 삭제할 수 있습니다.
합주 예약, 팀원 모집, 공지사항 세 가지 기능을 하나의 플랫폼에 담았습니다.

배포 URL: https://narae-ruddy.vercel.app

---

## 스크린샷

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
</table>


## 주요 기능

### 1. 합주 예약
- 미니 캘린더에서 날짜를 고르면 그날 09:00부터 24:00까지 타임슬롯을 한눈에 볼 수 있습니다.
- 빈 타임슬롯을 클릭하면 해당 시간이 자동으로 채워진 예약 모달이 뜹니다.
- 예약할 때는 팀명, 시작 시간, 종료 시간, 4자리 비밀번호, 색상을 입력합니다.
- 예약 블록을 클릭하고 비밀번호를 확인하면 수정하거나 취소할 수 있습니다.
- 선택한 날짜의 예약 건수, 예약된 총 시간, 남은 가용 시간을 카드로 보여줍니다.
- 선택한 날짜가 오늘이나 내일이면 뱃지로 표시됩니다.

### 2. 팀 모집
- 제목, 합주 곡명, 상세 내용, 작성자명, 파트 구성을 입력해 모집 글을 작성합니다.
- 보컬, 기타, 베이스, 드럼, 키보드 같은 기본 파트를 쓰거나 직접 파트를 추가할 수 있고, 파트별 모집 인원도 조절할 수 있습니다.
- 신청은 파트별로 이름만 입력하면 되고, 취소도 비밀번호 없이 신청자 이름으로 가능합니다.
- 작성자는 비밀번호를 확인한 뒤 모집 상태를 직접 열고 닫을 수 있습니다.
- 전체, 모집중, 마감 세 가지 탭으로 게시글을 필터링합니다.
- 게시글 삭제는 비밀번호 확인 후에만 가능합니다.

### 3. 공지사항
- 제목, 내용, 상단 고정 여부를 설정해 공지를 작성, 수정, 삭제합니다.
- 상단에 고정된 공지는 아이콘과 함께 일반 공지보다 위에 표시됩니다.
- 작성일과 수정일이 표시되고, 수정된 공지에는 "(수정됨)" 표시가 붙습니다.
- 공지 카드를 클릭하면 본문 전체를 모달로 볼 수 있습니다.

---

## 기술 스택

| 구분 | 기술 |
| --- | --- |
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion, Axios, date-fns |
| Backend | Spring Boot 3.2.0, Spring Security, Spring Data JPA, Spring Validation, Lombok |
| Database | PostgreSQL (운영, Supabase), MySQL (로컬 SQL 스크립트) |
| 빌드/배포 | Maven, Docker, Render (백엔드), Vercel (프론트엔드) |

---

## 프로젝트 구조
![프로젝트 구조](https://github.com/user-attachments/assets/7f5c47fd-36eb-41c9-88dd-37cfdf00f5ce)


---

## API 엔드포인트

### 합주 예약 `/api/reservations`

| 메서드 | 경로 | 설명 |
| --- | --- | --- |
| GET | `/api/reservations?date=YYYY-MM-DD` | 날짜별 예약 목록 조회 |
| POST | `/api/reservations` | 예약 생성 |
| POST | `/api/reservations/{id}/verify` | 비밀번호 인증 |
| PUT | `/api/reservations/{id}` | 예약 수정 |
| DELETE | `/api/reservations/{id}` | 예약 삭제 |

### 팀 모집 `/api/band-posts`

| 메서드 | 경로 | 설명 |
| --- | --- | --- |
| GET | `/api/band-posts` | 전체 게시글 목록 |
| GET | `/api/band-posts/{id}` | 게시글 상세 조회 |
| POST | `/api/band-posts` | 게시글 작성 |
| PUT | `/api/band-posts/{id}` | 게시글 수정 |
| DELETE | `/api/band-posts/{id}` | 게시글 삭제 |
| POST | `/api/band-posts/{id}/verify-password` | 비밀번호 인증 |
| POST | `/api/band-posts/{id}/parts/{partId}/join` | 파트 신청 |
| DELETE | `/api/band-posts/{postId}/participants/{participantId}` | 신청 취소 |
| PATCH | `/api/band-posts/{id}/toggle-close` | 모집 상태 토글 |

### 공지사항 `/api/notices`

| 메서드 | 경로 | 설명 |
| --- | --- | --- |
| GET | `/api/notices` | 공지 목록 조회 |
| GET | `/api/notices/{id}` | 공지 상세 조회 |
| POST | `/api/notices` | 공지 작성 |
| PUT | `/api/notices/{id}` | 공지 수정 |
| DELETE | `/api/notices/{id}` | 공지 삭제 |

---

## 데이터베이스 구조
![DB 구조](https://github.com/user-attachments/assets/ed75107b-a373-492f-a4c4-c48d8b845fbd)

---

## 로컬 실행 방법

사전 준비: Java 17 이상, Node.js 18 이상, PostgreSQL 또는 MySQL

### 백엔드

```bash
./mvnw spring-boot:run
```

`http://localhost:8080`에서 실행됩니다. MySQL로 로컬 개발을 하는 경우 `narae_db.sql`을 실행해 테이블과 샘플 데이터를 넣을 수 있습니다.

### 프론트엔드

```bash
cd frontend
npm install
npm run dev
```

`http://localhost:5173`에서 접속할 수 있습니다.

---

## 트러블슈팅

### 1. 배포 후 서버가 잠들어 첫 접속이 느린 문제

- 문제: 배포한 사이트에 오랜만에 들어가면 이전 데이터가 바로 뜨지 않는 문제가 있었습니다.
- 해결: Render 무료 플랜은 일정 시간 요청이 없으면 서버가 잠들었다가 다시 요청이 와야 깨어나는 구조였습니다. 그래서 UptimeRobot으로 주기적으로 서버에 요청을 보내 잠들지 않도록 설정하여 해결했습니다. 모니터링 툴을 직접 써본 것은 이번이 처음이었습니다.

### 2. 모바일에서 가독성이 떨어지는 문제

- 문제: PC 화면 기준으로 레이아웃을 잡다 보니 모바일에서는 글자 크기와 여백이 답답하게 보였습니다.
- 해결: 미디어 쿼리로 화면 크기별 스타일을 다시 정리해 모바일에서도 편하게 볼 수 있도록 수정했습니다.

### 3. 파트 신청 취소가 화면에 반영되지 않는 문제

- 문제: 팀 모집 게시글에서 파트 신청을 취소해도 목록에서 바로 사라지지 않는 오류가 있었습니다.
- 해결: 게시글 상세를 조회하는 JPQL 쿼리가 `parts`만 조인하고 `participants`는 조인하지 않아서, 취소 요청이 성공해도 다음 조회에서 예전 참여자 목록이 그대로 남아있는 것이 원인이었습니다. 쿼리를 `participants`까지 함께 조인하도록 수정하고, 프론트엔드도 취소 후 다시 목록을 통째로 재조회하는 대신 API가 반환하는 최신 데이터를 바로 화면에 반영하도록 바꿔서 해결하였습니다.

---

## 보안 구조

- 로그인 없이 비밀번호로 본인을 인증하는 비회원 구조입니다.
- 비밀번호는 BCrypt로 해시해서 저장합니다.
- CORS 허용 오리진은 환경변수로 제어합니다.

---

## 느낀 점
두번째로 배포까지 해본 프로젝트라 그런지 큰 어려움 없이 지나갔지만, 무료 서버가 잠들었다가 깨어나는 걸 보고 UptimeRobot 같은 모니터링 툴을 처음 써봤고, 프론트엔드와 백엔드 사이에서 데이터가 어떻게 흘러야 화면에 제대로 반영되는지도 파트 취소 버그를 고치면서 다시 한번 배울수있었습니다. 무엇보다 실제 밴드 동아리 활동을 하면서 겪었던 불편함을 직접 해결했다는 점에서 좋은 경험이 되었습니다. 합주실 예약이 겹치거나 팀원을 구하기 어려웠던 문제를 겪어봤기 때문에 어떤 기능이 필요한지 더 정확하게 알 수 있었고, 완성된 서비스를 실제로 동아리에서 써볼 수 있다는 점도 좋았습니다. 
