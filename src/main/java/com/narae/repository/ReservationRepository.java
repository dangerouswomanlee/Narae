package com.narae.repository;

import com.narae.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByReservationDateOrderByStartTime(LocalDate date);

    @Query("""
        SELECT r FROM Reservation r
        WHERE r.reservationDate = :date
        AND r.id != :excludeId
        AND (
            (r.startTime < :endTime AND r.endTime > :startTime)
        )
    """)
    List<Reservation> findOverlappingExcluding(
        @Param("date") LocalDate date,
        @Param("startTime") LocalTime startTime,
        @Param("endTime") LocalTime endTime,
        @Param("excludeId") Long excludeId
    );

    @Query("""
        SELECT r FROM Reservation r
        WHERE r.reservationDate = :date
        AND (
            (r.startTime < :endTime AND r.endTime > :startTime)
        )
    """)
    List<Reservation> findOverlapping(
        @Param("date") LocalDate date,
        @Param("startTime") LocalTime startTime,
        @Param("endTime") LocalTime endTime
    );
}
