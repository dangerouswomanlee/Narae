package com.narae.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "band_part")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BandPart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private BandPost post;

    @Column(name = "part_name", nullable = false, length = 30)
    private String partName;

    @Column(name = "max_count", nullable = false)
    private Integer maxCount;

    @OneToMany(mappedBy = "part", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<BandParticipant> participants = new ArrayList<>();
}
