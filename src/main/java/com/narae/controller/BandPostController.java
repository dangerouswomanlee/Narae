package com.narae.controller;

import com.narae.dto.*;
import com.narae.service.BandPostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/band-posts")
@RequiredArgsConstructor
public class BandPostController {

    private final BandPostService bandPostService;

    @GetMapping
    public ResponseEntity<List<BandPostResponseDto>> getAll() {
        return ResponseEntity.ok(bandPostService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BandPostResponseDto> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(bandPostService.getPost(id));
    }

    @PostMapping
    public ResponseEntity<BandPostResponseDto> create(@Valid @RequestBody BandPostRequestDto dto) {
        return ResponseEntity.ok(bandPostService.create(dto));
    }

    @PostMapping("/{id}/verify-password")
    public ResponseEntity<Map<String, Boolean>> verifyPassword(
        @PathVariable Long id,
        @RequestBody Map<String, String> body
    ) {
        String password = body.getOrDefault("password", "");
        boolean valid = bandPostService.verifyPassword(id, password);
        return ResponseEntity.ok(Map.of("valid", valid));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BandPostResponseDto> update(
        @PathVariable Long id,
        @Valid @RequestBody BandPostUpdateDto dto
    ) {
        return ResponseEntity.ok(bandPostService.update(id, dto));
    }

    @PostMapping("/{id}/parts/{partId}/join")
    public ResponseEntity<BandPostResponseDto> joinPart(
        @PathVariable Long id,
        @PathVariable Long partId,
        @RequestBody Map<String, String> body
    ) {
        String name = body.get("participantName");
        if (name == null || name.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(bandPostService.joinPart(partId, name));
    }

    @DeleteMapping("/{postId}/participants/{participantId}")
    public ResponseEntity<BandPostResponseDto> leaveParticipant(
        @PathVariable Long postId,
        @PathVariable Long participantId
    ) {
        return ResponseEntity.ok(bandPostService.leaveParticipant(postId, participantId));
    }

    @PatchMapping("/{id}/toggle-close")
    public ResponseEntity<BandPostResponseDto> toggleClose(@PathVariable Long id) {
        return ResponseEntity.ok(bandPostService.toggleClose(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
        @PathVariable Long id,
        @RequestBody(required = false) Map<String, String> body
    ) {
        String password = body != null ? body.getOrDefault("password", "") : "";
        bandPostService.delete(id, password);
        return ResponseEntity.noContent().build();
    }
}
