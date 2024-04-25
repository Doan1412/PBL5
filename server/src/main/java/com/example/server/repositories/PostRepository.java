package com.example.server.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import com.example.server.models.Entity.Post;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface PostRepository extends Neo4jRepository<Post, String> {
    @Query("MATCH (post:Post {id: $postId})<-[:LIKED_BY]-(user:User) RETURN user.id")
    List<String> getLikeUser(@Param("postId") String postId);
    @Query("MATCH (p:Post)-[:SHARED_BY]->(u:User) WHERE id(p) = $postId RETURN count(u) AS shareCount")
    int getShareCount(@Param("postId") String postId);
    @Query("MATCH (p:Post)<-[:POSTED_BY]-(:User{id : $user_id}) " +
            "WHERE NOT (p)<-[:COMMENTED_ON]-(:Post) " +
            "RETURN p.id")
    List<String> findByUserId(@Param("user_id") String user_id);
    @Query("MATCH (u:User {id : $id})-[:FRIEND]-(user:User)-[p:POSTED_BY]->(post:Post) " +
            "WHERE NOT (post)<-[:COMMENTED_ON]-(:Post) " +
            "WITH DISTINCT post " +
            "RETURN post.id " +
            "ORDER BY post.timestamp DESC " +
            "SKIP $skip LIMIT $limit")
    List<String> getTimelinePosts(String id, int skip, int limit);

    @Query("MATCH (p1:Post {id: $postId}), (p2:Post {id: $commentId}) CREATE (p1)-[:COMMENTED_ON]->(p2)")
    void addCommentToPost(@Param("postId") String postId,@Param("commentId") String commentId);
    @Query("MATCH (p1:Post {id: $postId})-[r:COMMENTED_ON]->(p2:Post) DETACH DELETE r,p2")
    void deleteComment(@Param("postId") String postId);
}