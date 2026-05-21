-- 나래 합주실 예약 시스템 DB 초기화 스크립트
-- MySQL 8.0+

CREATE DATABASE IF NOT EXISTS narae_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE narae_db;

-- 예약 테이블
CREATE TABLE IF NOT EXISTS reservation (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    team_name     VARCHAR(50)  NOT NULL,
    reservation_date DATE      NOT NULL,
    start_time    TIME         NOT NULL,
    end_time      TIME         NOT NULL,
    password      VARCHAR(255) NOT NULL,
    color_index   INT          DEFAULT 0,
    created_at    DATETIME     DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_date (reservation_date)
);

-- 밴드 모집 게시글
CREATE TABLE IF NOT EXISTS band_post (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    title        VARCHAR(100) NOT NULL,
    song_name    VARCHAR(100),
    content      TEXT,
    author_name  VARCHAR(50),
    password     VARCHAR(255),
    is_closed    BOOLEAN      DEFAULT FALSE,
    created_at   DATETIME     DEFAULT CURRENT_TIMESTAMP
);

-- 파트 정보
CREATE TABLE IF NOT EXISTS band_part (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id     BIGINT       NOT NULL,
    part_name   VARCHAR(30)  NOT NULL,
    max_count   INT          NOT NULL DEFAULT 1,
    FOREIGN KEY (post_id) REFERENCES band_post(id) ON DELETE CASCADE
);

-- 참여자
CREATE TABLE IF NOT EXISTS band_participant (
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    part_id          BIGINT      NOT NULL,
    participant_name VARCHAR(50) NOT NULL,
    created_at       DATETIME    DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (part_id) REFERENCES band_part(id) ON DELETE CASCADE
);

-- 공지사항
CREATE TABLE IF NOT EXISTS notice (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    title      VARCHAR(100) NOT NULL,
    content    TEXT         NOT NULL,
    is_pinned  BOOLEAN      DEFAULT FALSE,
    created_at DATETIME     DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 샘플 데이터
INSERT INTO notice (title, content, is_pinned) VALUES
('나래 합주실 오픈 안내', '나래 합주실이 오픈했습니다!\n\n운영시간: 09:00 ~ 22:00\n예약은 홈페이지에서 가능합니다.\n\n궁금하신 점은 관리자에게 문의해주세요.', TRUE),
('5월 정기 점검 안내', '5월 25일(토) 오전 10시 ~ 오후 2시 정기 점검이 있을 예정입니다.\n해당 시간에는 예약이 불가합니다.', FALSE);

-- 샘플 게시글 기본 비밀번호: 1234 (BCrypt 해시)
INSERT INTO band_post (title, song_name, content, author_name, password) VALUES
('Oasis 합주 같이 하실 분!', 'Don''t Look Back in Anger', '브릿팝 좋아하시는 분들 모여요!\n주 1~2회 합주 생각하고 있습니다 :)', '기타리스트김',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');

SET @post_id = LAST_INSERT_ID();
INSERT INTO band_part (post_id, part_name, max_count) VALUES
(@post_id, '보컬', 1),
(@post_id, '기타', 2),
(@post_id, '베이스', 1),
(@post_id, '드럼', 1);
