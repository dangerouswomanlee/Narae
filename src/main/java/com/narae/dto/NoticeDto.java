package com.narae.dto;

import com.narae.entity.Notice;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticeDto {

    private Long id;

    @NotBlank(message = "제목을 입력해주세요")
    @Size(max = 100)
    private String title;

    @NotBlank(message = "내용을 입력해주세요")
    private String content;

    private Boolean isPinned;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static NoticeDto from(Notice notice) {
        return NoticeDto.builder()
            .id(notice.getId())
            .title(notice.getTitle())
            .content(notice.getContent())
            .isPinned(notice.getIsPinned())
            .createdAt(notice.getCreatedAt())
            .updatedAt(notice.getUpdatedAt())
            .build();
    }
}
