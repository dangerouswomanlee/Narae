package com.narae.dto;

import com.narae.entity.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BandPostResponseDto {

    private Long id;
    private String title;
    private String songName;
    private String content;
    private String authorName;
    private Boolean isClosed;
    private LocalDateTime createdAt;
    private List<PartDto> parts;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PartDto {
        private Long id;
        private String partName;
        private Integer maxCount;
        private Integer currentCount;
        private List<ParticipantDto> participants;

        public static PartDto from(BandPart part) {
            return PartDto.builder()
                .id(part.getId())
                .partName(part.getPartName())
                .maxCount(part.getMaxCount())
                .currentCount(part.getParticipants().size())
                .participants(part.getParticipants().stream()
                    .map(ParticipantDto::from)
                    .collect(Collectors.toList()))
                .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ParticipantDto {
        private Long id;
        private String participantName;
        private LocalDateTime createdAt;

        public static ParticipantDto from(BandParticipant p) {
            return ParticipantDto.builder()
                .id(p.getId())
                .participantName(p.getParticipantName())
                .createdAt(p.getCreatedAt())
                .build();
        }
    }

    public static BandPostResponseDto from(BandPost post) {
        return BandPostResponseDto.builder()
            .id(post.getId())
            .title(post.getTitle())
            .songName(post.getSongName())
            .content(post.getContent())
            .authorName(post.getAuthorName())
            .isClosed(post.getIsClosed())
            .createdAt(post.getCreatedAt())
            .parts(post.getParts().stream()
                .map(PartDto::from)
                .collect(Collectors.toList()))
            .build();
    }
}
