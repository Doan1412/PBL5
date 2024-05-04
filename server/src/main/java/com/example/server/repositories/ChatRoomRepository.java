package com.example.server.repositories;

import com.example.server.models.Entity.ChatRoom;

import java.util.List;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends Neo4jRepository<ChatRoom, String> {
    @Query("MATCH (:User{id: $id1})-[:MEMBER_OF]->(c:room)<-[:MEMBER_OF]-(:User{id: $id2}) RETURN c.id")
    String findChatRoomByMembers(String id1, String id2);
    @Query("MATCH (:User{id: $id1})-[:MEMBER_OF]->(c:room) RETURN c.id")
    List<String> findChatRoomByUserId(String id1);
}
