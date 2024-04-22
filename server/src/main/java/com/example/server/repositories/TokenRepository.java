package com.example.server.repositories;

import com.example.server.models.Entity.Account;
import com.example.server.models.Entity.Token;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;


@Repository
public interface TokenRepository extends Neo4jRepository<Token, String> {
    Optional<Token> findByToken(String token);
    void deleteByToken(String token);
    void deleteByAccountId(String id);
    @Query("MATCH (t:Token)<-[:HAS_TOKEN]-(a:Account) WHERE a.id = $id RETURN t.id")
    String findByAccountId(String id);
}
