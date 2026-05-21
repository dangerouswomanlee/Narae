package com.narae.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BandPostUpdateDto {

    @NotBlank(message = "제목을 입력해주세요")
    @Size(max = 100)
    private String title;

    @Size(max = 100)
    private String songName;

    private String content;
}
