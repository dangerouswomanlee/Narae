package com.narae.service;

import com.narae.dto.NoticeDto;
import com.narae.entity.Notice;
import com.narae.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public List<NoticeDto> getAll() {
        return noticeRepository.findAllByOrderByIsPinnedDescCreatedAtDesc()
            .stream()
            .map(NoticeDto::from)
            .collect(Collectors.toList());
    }

    public NoticeDto getOne(Long id) {
        Notice notice = noticeRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("공지사항을 찾을 수 없습니다"));
        return NoticeDto.from(notice);
    }

    @Transactional
    public NoticeDto create(NoticeDto dto) {
        Notice notice = Notice.builder()
            .title(dto.getTitle())
            .content(dto.getContent())
            .isPinned(dto.getIsPinned() != null ? dto.getIsPinned() : false)
            .build();
        return NoticeDto.from(noticeRepository.save(notice));
    }

    @Transactional
    public NoticeDto update(Long id, NoticeDto dto) {
        Notice notice = noticeRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("공지사항을 찾을 수 없습니다"));
        notice.setTitle(dto.getTitle());
        notice.setContent(dto.getContent());
        if (dto.getIsPinned() != null) {
            notice.setIsPinned(dto.getIsPinned());
        }
        return NoticeDto.from(notice);
    }

    @Transactional
    public void delete(Long id) {
        Notice notice = noticeRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("공지사항을 찾을 수 없습니다"));
        noticeRepository.delete(notice);
    }
}
