package com.example.server.repositories;

import com.example.server.models.Entity.Message;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends Neo4jRepository<Message, String> {
    List<Message> findByRoomId(String room_id);
}
