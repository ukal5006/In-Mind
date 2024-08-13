package com.ssafy.inmind.report.repository;

import com.ssafy.inmind.report.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Long> {
//    @Query("SELECT r.id FROM Report r WHERE r.child.id = :childIdx ORDER BY r.createdAt DESC")
//    Optional<Report> findLatestReportIdxByChildIdx(@Param("childIdx") Long childIdx);
    Optional<Report> findTopByChildIdOrderByCreatedAtDesc(Long childIdx);

}
