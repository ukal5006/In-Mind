package com.ssafy.inmind.user.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.inmind.reservation.entity.QReservation;
import com.ssafy.inmind.user.dto.CounselorListDto;
import com.ssafy.inmind.user.dto.OrgListResponseDto;
import com.ssafy.inmind.user.dto.QCounselorListDto;
import com.ssafy.inmind.user.dto.QOrgListResponseDto;
import com.ssafy.inmind.user.entity.*;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SearchRepositoryImpl implements SearchRepository{

    private final JPAQueryFactory queryFactory;

    public SearchRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<CounselorListDto> findCounselorsByName(String name) {
        QUser user = QUser.user;
        QOrganization organization = QOrganization.organization;
        QCertificate certificate = QCertificate.certificate;
        QResume resume = QResume.resume;
        QReservation reservation = QReservation.reservation;
        QReview review = QReview.review;

        return queryFactory
                .select(new QCounselorListDto(
                        user.id,
                        user.name,
                        user.tel,
                        user.profile,
                        user.isAuth,
                        organization.name,
                        organization.tel,
                        certificate.title,
                        resume.info.as("resumeInfo"),
                        review.rno.count().as("reviewCount"),
                        review.score.avg().coalesce(0.0).as("reviewAverage")
                ))
                .from(user)
                .leftJoin(organization).on(user.organization.id.eq(organization.id))
                .leftJoin(certificate).on(user.id.eq(certificate.user.id))
                .leftJoin(resume).on(user.id.eq(resume.user.id))
                .leftJoin(reservation).on(user.id.eq(reservation.counselor.id))
                .leftJoin(review).on(review.reservation.id.eq(reservation.id))
                .where(user.name.contains(name)
                        .and(user.role.eq(RoleStatus.COUNSELOR)))
                .groupBy(
                        user.id, user.name, user.tel, user.profile, user.isAuth,
                        organization.name, organization.tel,
                        certificate.title, resume.info
                )
                .fetch();
    }

    @Override
    public List<OrgListResponseDto> findOrgByName(String name) {
        QOrganization organization = QOrganization.organization;
        QUser user = QUser.user;

        return queryFactory
                .select(new QOrgListResponseDto(
                        organization.name,
                        organization.addr,
                        organization.tel,
                        user.id.count().intValue()
                ))
                .from(organization)
                .leftJoin(user).on(organization.id.eq(user.organization.id))
                .where(organization.name.contains(name))
                .groupBy(organization.id)
                .fetch();
    }
}
