package com.example.server.repositories;

import com.example.server.models.Account;
import com.example.server.models.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AccountRepository extends Neo4jRepository<Account, String> {
    Optional<Account> findByEmail(String email);
    @Query("MATCH (u:User)-[:HAS_ACCOUNT]->(a:Account) WHERE a.id = $accountId RETURN u.id")
    String findUserIdByAccountId(@Param("accountId") String accountId);
}
