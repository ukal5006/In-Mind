package com.ssafy.inmind.user.repository.search;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.inmind.reservation.entity.QReservation;
import com.ssafy.inmind.user.dto.CounselorListDto;
import com.ssafy.inmind.user.dto.QCounselorListDto;
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
}
