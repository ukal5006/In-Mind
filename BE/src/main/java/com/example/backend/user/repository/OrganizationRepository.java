package com.example.backend.user.repository;

import com.example.backend.user.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {

}
