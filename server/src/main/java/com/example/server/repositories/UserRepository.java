package com.example.server.repositories;

import com.example.server.models.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

import java.util.Optional;

@Repository
public interface UserRepository extends Neo4jRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String email);
}
