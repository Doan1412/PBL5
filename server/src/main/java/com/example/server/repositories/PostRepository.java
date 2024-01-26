package com.example.server.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import com.example.server.models.Post;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface PostRepository extends Neo4jRepository<Post, String> {
    @Query("MATCH (p:Post)-[:LIKED_BY]->(u:User) WHERE id(p) = $postId RETURN count(u) AS likeCount")
    int getLikeCount(@Param("postId") String postId);
    @Query("MATCH (p:Post)-[:SHARED_BY]->(u:User) WHERE id(p) = $postId RETURN count(u) AS shareCount")
    int getShareCount(@Param("postId") String postId);
    List<Post> findByUserId(String user_id);
}
