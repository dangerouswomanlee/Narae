package com.narae.repository;

import com.narae.entity.BandPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BandPostRepository extends JpaRepository<BandPost, Long> {

    @Query("SELECT DISTINCT p FROM BandPost p LEFT JOIN FETCH p.parts ORDER BY p.createdAt DESC")
    List<BandPost> findAllWithParts();

    @Query("SELECT DISTINCT p FROM BandPost p LEFT JOIN FETCH p.parts WHERE p.id = :id")
    Optional<BandPost> findByIdWithPartsAndParticipants(Long id);
}
