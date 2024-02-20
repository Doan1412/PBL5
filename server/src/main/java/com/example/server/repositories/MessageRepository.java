package com.example.server.repositories;

import com.example.server.models.Message;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends Neo4jRepository<Message, String> {
}
