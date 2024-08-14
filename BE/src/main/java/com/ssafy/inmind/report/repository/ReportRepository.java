package com.ssafy.inmind.report.repository;

import com.ssafy.inmind.report.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {

}
