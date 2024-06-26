package com.example.server.repositories;

import com.example.server.models.Entity.SharedPost;

import java.util.List;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SharePostRepository extends Neo4jRepository<SharedPost,String> {
    @Query("MATCH (p:Share_post)-[:SHARED_BY]->(u:User {id : $id}) RETURN p.id")
    List <String> getShareByUser(@Param("id") String id);
    @Query("MATCH (u:User {id : $id})-[:FRIEND]-(user:User)<-[p:SHARED_BY]-(post:Share_post) " +
            "WHERE NOT (post)<-[:COMMENTED_ON]-(:Post) " +
            "WITH DISTINCT post " +
            "RETURN post.id " +
            "ORDER BY post.timestamp DESC " +
            "SKIP $skip LIMIT $limit")
    List<String> getTimelineSharePosts(String id, int skip, int limit);
    @Query("MATCH (p1:Share_post {id: $postId}), (p2:Post {id: $commentId}) CREATE (p1)-[:COMMENTED_ON]->(p2)")
    void addCommentToPost(@Param("postId") String postId,@Param("commentId") String commentId);
    @Query("MATCH (p:Share_post {id: $postId})-[:COMMENTED_ON]->(c:Post) RETURN c.id ORDER BY c.createdAt DESC")
    List<String> getCommentsForPost(@Param("postId") String postId);
}
