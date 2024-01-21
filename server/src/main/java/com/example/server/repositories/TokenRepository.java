package com.example.server.repositories;

import com.example.server.models.Token;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository;
import reactor.core.publisher.Mono;

import java.util.Optional;

public interface TokenRepository extends Neo4jRepository<Token, String> {
    Optional<Token> findByToken(String token);
    void deleteByToken(String token);
    void deleteByUserId(String id);
}
