package com.ssafy.inmind.user.repository.search;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.inmind.reservation.entity.QReservation;
import com.ssafy.inmind.user.dto.CounselorListDto;
import com.ssafy.inmind.user.dto.CounselorResponseDto;
import com.ssafy.inmind.user.dto.QCounselorListDto;
import com.ssafy.inmind.user.dto.QCounselorResponseDto;
import com.ssafy.inmind.user.entity.*;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SearchCounselorRepositoryImpl implements SearchCounselorRepository {

    private final JPAQueryFactory queryFactory;

    public SearchCounselorRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<CounselorListDto> findCounselorsByName(String name) {
        QUser user = QUser.user;
        QOrganization organization = QOrganization.organization;
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
                        user.intro,
                        organization.name,
                        organization.tel,
                        resume.info.as("resumeInfo"),
                        review.rno.count().as("reviewCount"),
                        review.score.avg().coalesce(0.0).as("reviewAverage")
                ))
                .from(user)
                .leftJoin(organization).on(user.organization.id.eq(organization.id))
                .leftJoin(resume).on(user.id.eq(resume.user.id))
                .leftJoin(reservation).on(user.id.eq(reservation.counselor.id))
                .leftJoin(review).on(review.reservation.id.eq(reservation.id))
                .where(user.name.contains(name)
                        .and(user.role.eq(RoleStatus.COUNSELOR)))
                .groupBy(
                        user.id, user.name, user.tel, user.profile, user.isAuth,
                        organization.name, organization.tel, resume.info
                )
                .fetch();
    }

    @Override
    public List<CounselorListDto> findAllCounselors() {
        QUser user = QUser.user;
        QOrganization organization = QOrganization.organization;
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
                        user.intro,
                        organization.name,
                        organization.tel,
                        resume.info.as("resumeInfo"),
                        review.rno.count().as("reviewCount"),
                        review.score.avg().coalesce(0.0).as("reviewAverage")
                ))
                .from(user)
                .leftJoin(organization).on(user.organization.id.eq(organization.id))
                .leftJoin(resume).on(user.id.eq(resume.user.id))
                .leftJoin(reservation).on(user.id.eq(reservation.counselor.id))
                .leftJoin(review).on(review.reservation.id.eq(reservation.id))
                .where(user.role.eq(RoleStatus.COUNSELOR))
                .groupBy(
                        user.id, user.name, user.tel, user.profile, user.isAuth,
                        organization.name, organization.tel, resume.info
                )
                .fetch();
    }

    @Override
    public CounselorResponseDto findCounselorById(Long id) {
        QUser user = QUser.user;
        QOrganization organization = QOrganization.organization;
        QResume resume = QResume.resume;
        QReservation reservation = QReservation.reservation;
        QReview review = QReview.review;

        return queryFactory
                .select(new QCounselorResponseDto(
                        user.id,
                        user.name,
                        user.tel,
                        user.profile,
                        user.isAuth,
                        user.intro,
                        organization.name,
                        organization.tel,
                        resume.info.as("resumeInfo"),
                        review.rno.count().as("reviewCount"),
                        review.score.avg().coalesce(0.0).as("reviewAverage")
                ))
                .from(user)
                .leftJoin(organization).on(user.organization.id.eq(organization.id))
                .leftJoin(resume).on(user.id.eq(resume.user.id))
                .leftJoin(reservation).on(user.id.eq(reservation.counselor.id))
                .leftJoin(review).on(review.reservation.id.eq(reservation.id))
                .where(user.id.eq(id)
                        .and(user.role.eq(RoleStatus.COUNSELOR)))
                .groupBy(
                        user.id, user.name, user.tel, user.profile, user.isAuth,
                        organization.name, organization.tel, resume.info
                ).fetchOne();
    }
}
