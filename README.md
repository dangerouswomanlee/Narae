# 🎸 나래 (Narae)

밴드 동아리를 위한 합주실 예약 및 팀 모집 웹 서비스입니다.

---

## 주요 기능

- **합주 예약** — 날짜별 타임테이블로 합주실 시간을 예약·수정·취소
- **팀 모집** — 파트별 인원을 모집하고 신청·취소 관리
- **공지사항** — 동아리 공지 작성 및 조회

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| Backend | Spring Boot, Spring Security, Spring Data JPA |
| Database | MySQL |
| 통신 | Axios, REST API |

---

## 프로젝트 구조

```
Narae/
├── src/main/java/com/narae/   # Spring Boot 백엔드
│   ├── controller/
│   ├── service/
│   ├── entity/
│   ├── repository/
│   ├── dto/
│   └── config/
└── frontend/                  # React 프론트엔드
    └── src/
        ├── pages/
        ├── components/
        └── services/
```

---

## 실행 방법

### 사전 준비
- Java 17+
- Node.js 18+
- MySQL

### 1. 데이터베이스 설정

```sql
CREATE DATABASE narae_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

`src/main/resources/application.properties`에서 MySQL 비밀번호를 변경하세요:

```properties
spring.datasource.password=본인_비밀번호
```

### 2. 백엔드 실행

Eclipse 또는 터미널에서 `NaraeApplication.java` 실행 (포트: 8080)

### 3. 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속
