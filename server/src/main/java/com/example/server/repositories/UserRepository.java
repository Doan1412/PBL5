package com.example.server.repositories;

import com.example.server.models.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

import java.util.Optional;

@Repository
public interface UserRepository extends Neo4jRepository<User, String> {
    Optional<User> findByUsername(String email);
    Optional<User> findByAccount_Id(String id);
    @Query("MATCH (user:User)-[:HAS_ACCOUNT]->(account:Account) WHERE account.email = $email RETURN user.id AS user_id")
    String getUserIdByEmail(String email);
}
