package com.narae.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "band_post")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BandPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(name = "song_name", length = 100)
    private String songName;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "author_name", length = 50)
    private String authorName;

    @Column(name = "is_closed")
    @Builder.Default
    private Boolean isClosed = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<BandPart> parts = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
