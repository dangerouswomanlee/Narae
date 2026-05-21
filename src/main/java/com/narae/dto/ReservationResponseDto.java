package com.narae.dto;

import com.narae.entity.Reservation;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationResponseDto {

    private Long id;
    private String teamName;
    private LocalDate reservationDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer colorIndex;
    private LocalDateTime createdAt;

    public static ReservationResponseDto from(Reservation r) {
        return ReservationResponseDto.builder()
            .id(r.getId())
            .teamName(r.getTeamName())
            .reservationDate(r.getReservationDate())
            .startTime(r.getStartTime())
            .endTime(r.getEndTime())
            .colorIndex(r.getColorIndex())
            .createdAt(r.getCreatedAt())
            .build();
    }
}
