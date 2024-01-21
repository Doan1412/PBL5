package com.example.server.repositories;

import java.util.Map;
import java.util.Optional;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import com.example.server.models.FriendRequest;

public interface FriendRequestRepository extends Neo4jRepository<FriendRequest, String> {

    Optional<FriendRequest> findById(String id);

    // Thêm một phương thức để tìm FriendRequest theo ID và trả về User 1 và User 2
    @Query("MATCH (u1:User)-[r:FRIEND_REQUEST]->(u2:User) WHERE ID(r) = $friendRequestId RETURN u1, u2")
    Optional<Map<String, Object>> findUsersByFriendRequestId(@Param("friendRequestId") String friendRequestId);
}
