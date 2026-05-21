package com.narae.repository;

import com.narae.entity.BandParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BandParticipantRepository extends JpaRepository<BandParticipant, Long> {

    @Query("SELECT COUNT(bp) FROM BandParticipant bp WHERE bp.part.post.id = :postId")
    long countByPostId(@Param("postId") Long postId);
}
