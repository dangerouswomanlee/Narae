package com.narae.controller;

import com.narae.dto.*;
import com.narae.service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping
    public ResponseEntity<List<ReservationResponseDto>> getByDate(
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return ResponseEntity.ok(reservationService.getReservationsByDate(date));
    }

    @PostMapping
    public ResponseEntity<ReservationResponseDto> create(
        @Valid @RequestBody ReservationRequestDto dto
    ) {
        return ResponseEntity.ok(reservationService.create(dto));
    }

    @PostMapping("/{id}/verify")
    public ResponseEntity<Map<String, Boolean>> verifyPassword(
        @PathVariable Long id,
        @Valid @RequestBody PasswordVerifyDto dto
    ) {
        boolean valid = reservationService.verifyPassword(id, dto.getPassword());
        return ResponseEntity.ok(Map.of("valid", valid));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservationResponseDto> update(
        @PathVariable Long id,
        @Valid @RequestBody ReservationRequestDto dto
    ) {
        return ResponseEntity.ok(reservationService.update(id, dto, dto.getPassword()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
        @PathVariable Long id,
        @Valid @RequestBody PasswordVerifyDto dto
    ) {
        reservationService.delete(id, dto.getPassword());
        return ResponseEntity.noContent().build();
    }
}
