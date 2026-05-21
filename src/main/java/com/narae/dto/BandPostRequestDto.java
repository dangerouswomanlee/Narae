package com.narae.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BandPostRequestDto {

    @NotBlank(message = "제목을 입력해주세요")
    @Size(max = 100)
    private String title;

    @Size(max = 100)
    private String songName;

    private String content;

    @Size(max = 50)
    private String authorName;

    @NotEmpty(message = "파트를 최소 1개 이상 추가해주세요")
    private List<PartDto> parts;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PartDto {
        @NotBlank
        private String partName;

        @Min(1)
        private Integer maxCount;
    }
}
