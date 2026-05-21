package com.narae.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationRequestDto {

    @NotBlank(message = "팀 이름을 입력해주세요")
    @Size(max = 50)
    private String teamName;

    @NotNull(message = "날짜를 선택해주세요")
    private LocalDate reservationDate;

    @NotNull(message = "시작 시간을 선택해주세요")
    private LocalTime startTime;

    @NotNull(message = "종료 시간을 선택해주세요")
    private LocalTime endTime;

    @NotBlank(message = "비밀번호를 입력해주세요")
    @Size(min = 4, max = 4, message = "비밀번호는 4자리여야 합니다")
    @Pattern(regexp = "\\d{4}", message = "비밀번호는 숫자 4자리여야 합니다")
    private String password;
}
