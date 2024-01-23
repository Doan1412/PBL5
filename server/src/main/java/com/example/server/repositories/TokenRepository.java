package com.example.server.repositories;

import com.example.server.models.Token;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository;
import org.springframework.stereotype.Repository;

import reactor.core.publisher.Mono;

import java.util.Optional;

@Repository
public interface TokenRepository extends Neo4jRepository<Token, String> {
    Optional<Token> findByToken(String token);
    void deleteByToken(String token);
    void deleteByAccountId(String id);
}
