package com.example.server.repositories;

import com.example.server.models.Entity.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends Neo4jRepository<User, String> {
    Optional<User> findByUsername(String email);
    Optional<User> findByAccount_Id(String id);
    @Query("MATCH (user:User)-[:HAS_ACCOUNT]->(account:Account) WHERE account.email = $email RETURN user.id AS user_id")
    String getUserIdByEmail(String email);
    @Query("MATCH (p:Profile)<-[:HAS_PROFILE]-(u:User {id : $user_id})-[:HAS_ACCOUNT]->(a:Account)-[:HAS_TOKEN]->(t:Token) Detach delete p,u,a,t ")
    void deleteById(@Param("user_id") String user_id);
}
