package com.narae.repository;

import com.narae.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    List<Notice> findAllByOrderByIsPinnedDescCreatedAtDesc();
}
