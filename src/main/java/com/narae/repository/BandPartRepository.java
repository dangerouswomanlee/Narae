package com.narae.repository;

import com.narae.entity.BandPart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BandPartRepository extends JpaRepository<BandPart, Long> {

    @Query("SELECT p FROM BandPart p LEFT JOIN FETCH p.participants WHERE p.id = :id")
    Optional<BandPart> findByIdWithParticipants(Long id);
}
