package com.ssafy.inmind.user.repository.search;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.inmind.user.dto.OrgListResponseDto;
import com.ssafy.inmind.user.dto.QOrgListResponseDto;
import com.ssafy.inmind.user.entity.QOrganization;
import com.ssafy.inmind.user.entity.QUser;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SearchOrgRepositoryImpl implements SearchOrgRepository{

    private final JPAQueryFactory queryFactory;


    public SearchOrgRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
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

    @Override
    public List<OrgListResponseDto> findAllOrgs() {
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
                .groupBy(organization.id)
                .fetch();
    }
}
