package com.example.server.repositories;

import com.example.server.models.Entity.Account;
import jakarta.transaction.Transactional;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AccountRepository extends Neo4jRepository<Account, String> {
    Optional<Account> findByEmail(String email);
    @Query("MATCH (u:User)-[:HAS_ACCOUNT]->(a:Account) WHERE a.id = $accountId RETURN u.id")
    String findUserIdByAccountId(@Param("accountId") String accountId);
    @Transactional
    @Query("MATCH (u:User)-[:HAS_ACCOUNT]->(a:Account) WHERE id(u) = $userId SET a.status = $status")
    void updateUserStatus(@Param("userId") String userId, @Param("status") String status);

    @Query("MATCH (p:Profile)<-[:HAS_PROFILE]-(u:User {id: $userId} )-[:HAS_ACCOUNT]->(a:Account)-[:HAS_TOKEN]->(t:Token) DETACH DELETE p,u,t")
    void banAccount(@Param("userId") String userId);
}
