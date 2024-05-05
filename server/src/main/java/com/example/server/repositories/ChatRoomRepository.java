package com.example.server.repositories;

import com.example.server.DTO.MessageDTO;
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
    @Query("MATCH (r:room{id: $id})-[:RECIPIENT_MESSAGE]->(m:message)<-[:SENT_MESSAGE]-(u:User) RETURN m.id AS id, m.content AS content, m.timestamp AS timestamp, u.id AS senderId, r.id AS roomId ORDER BY m.timestamp DESC SKIP $page LIMIT $size")
    List<MessageDTO> getMessages(String id, int page, int size);
}
