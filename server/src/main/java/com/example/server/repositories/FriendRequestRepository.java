package com.example.server.repositories;

import java.util.List;
import java.util.Optional;

import com.example.server.DTO.DisplayUserDTO;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.server.models.Entity.FriendRequest;

@Repository
public interface FriendRequestRepository extends Neo4jRepository<FriendRequest, String> {

    Optional<FriendRequest> findById(String id);

    @Query("MATCH (u:User)<-[s:RECEIVE_FRIEND_REQUEST]-(r:FriendRequest) WHERE u.id = $userId RETURN r")
    List<FriendRequest> getReceivedFriendRequests(@Param("userId") String userId);
//    @Query("MATCH (f:FriendRequest)-[:RECEIVE_FRIEND_REQUEST]->(u:User{id: $user_id}) RETURN f,other")
    List<FriendRequest> findByReceiverId( String user_id);
    @Query("MATCH (user1:User)-[r:Friend]->(user2:User) " +
            "WHERE ( user1.id = $id1 AND user2.id = $id2 ) OR ( user1.id = $id2 AND user2.id = $id1 ) " +
            "DETACH DELETE r")
    void deleteByUserId(@Param("id1") String id1,@Param("id2") String id2);
    @Query("MATCH (u1:User)-[:SENT_FRIEND_REQUEST]->(request:FriendRequest)-[:RECEIVE_FRIEND_REQUEST]->(u2:User)\n" +
            "WHERE (u1.id = $id1 AND u2.id = $id2)\n" +
            "   OR (u1.id = $id2 AND u2.id = $id1)\n" +
            "DETACH DELETE request")
    void deleteFriendRequestByUser(@Param("id1") String id1,@Param("id2") String id2);
    @Query("MATCH (user:User)-[f:FRIEND]-(friend:User)-[:HAS_PROFILE]->(profile:Profile)\n" +
            "WHERE user.id = $id\n" +
            "RETURN friend.id AS id, friend.firstname + ' ' + friend.lastname AS fullname, profile.avatar_url AS avatar_url, friend.username AS username")
    List<DisplayUserDTO> getListDisplayUsers(@Param("id") String id);

}
