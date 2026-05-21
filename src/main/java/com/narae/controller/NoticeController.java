package com.narae.controller;

import com.narae.dto.NoticeDto;
import com.narae.service.NoticeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping
    public ResponseEntity<List<NoticeDto>> getAll() {
        return ResponseEntity.ok(noticeService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoticeDto> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(noticeService.getOne(id));
    }

    @PostMapping
    public ResponseEntity<NoticeDto> create(@Valid @RequestBody NoticeDto dto) {
        return ResponseEntity.ok(noticeService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoticeDto> update(
        @PathVariable Long id,
        @Valid @RequestBody NoticeDto dto
    ) {
        return ResponseEntity.ok(noticeService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        noticeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
