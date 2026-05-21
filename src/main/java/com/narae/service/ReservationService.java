package com.narae.service;

import com.narae.dto.*;
import com.narae.entity.Reservation;
import com.narae.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    private static final LocalTime OPEN_TIME = LocalTime.of(9, 0);
    private static final LocalTime CLOSE_TIME = LocalTime.of(22, 0);
    private static final int MAX_COLOR_INDEX = 8;

    public List<ReservationResponseDto> getReservationsByDate(LocalDate date) {
        return reservationRepository.findByReservationDateOrderByStartTime(date)
            .stream()
            .map(ReservationResponseDto::from)
            .collect(Collectors.toList());
    }

    @Transactional
    public ReservationResponseDto create(ReservationRequestDto dto) {
        validateTime(dto.getStartTime(), dto.getEndTime());

        List<Reservation> overlapping = reservationRepository.findOverlapping(
            dto.getReservationDate(), dto.getStartTime(), dto.getEndTime()
        );

        if (!overlapping.isEmpty()) {
            throw new IllegalStateException("해당 시간에 이미 예약이 존재합니다");
        }

        int colorIndex = new Random().nextInt(MAX_COLOR_INDEX);

        Reservation reservation = Reservation.builder()
            .teamName(dto.getTeamName())
            .reservationDate(dto.getReservationDate())
            .startTime(dto.getStartTime())
            .endTime(dto.getEndTime())
            .password(passwordEncoder.encode(dto.getPassword()))
            .colorIndex(colorIndex)
            .build();

        return ReservationResponseDto.from(reservationRepository.save(reservation));
    }

    public boolean verifyPassword(Long id, String rawPassword) {
        Reservation reservation = reservationRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다"));
        return passwordEncoder.matches(rawPassword, reservation.getPassword());
    }

    @Transactional
    public ReservationResponseDto update(Long id, ReservationRequestDto dto, String rawPassword) {
        Reservation reservation = reservationRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다"));

        if (!passwordEncoder.matches(rawPassword, reservation.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다");
        }

        validateTime(dto.getStartTime(), dto.getEndTime());

        List<Reservation> overlapping = reservationRepository.findOverlappingExcluding(
            dto.getReservationDate(), dto.getStartTime(), dto.getEndTime(), id
        );

        if (!overlapping.isEmpty()) {
            throw new IllegalStateException("해당 시간에 이미 예약이 존재합니다");
        }

        reservation.setTeamName(dto.getTeamName());
        reservation.setReservationDate(dto.getReservationDate());
        reservation.setStartTime(dto.getStartTime());
        reservation.setEndTime(dto.getEndTime());
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            reservation.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        return ReservationResponseDto.from(reservation);
    }

    @Transactional
    public void delete(Long id, String rawPassword) {
        Reservation reservation = reservationRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다"));

        if (!passwordEncoder.matches(rawPassword, reservation.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다");
        }

        reservationRepository.delete(reservation);
    }

    private void validateTime(LocalTime start, LocalTime end) {
        if (!start.isBefore(end)) {
            throw new IllegalArgumentException("시작 시간은 종료 시간보다 이전이어야 합니다");
        }
        if (start.isBefore(OPEN_TIME) || end.isAfter(CLOSE_TIME)) {
            throw new IllegalArgumentException("운영 시간은 09:00 ~ 22:00 입니다");
        }
    }
}
