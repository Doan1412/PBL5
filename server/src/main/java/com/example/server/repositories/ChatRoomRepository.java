package com.example.server.repositories;

import com.example.server.models.Entity.ChatRoom;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends Neo4jRepository<ChatRoom, String> {
}
