package com.example.server.repositories;

import com.example.server.models.Entity.Comment;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends Neo4jRepository<Comment, String> {
    List<Comment> findByPostId(String post_id);
    @Query("MATCH (p:Post {id: $postId})<-[:COMMENTED_ON]-(c:Comment) RETURN c ORDER BY c.createdAt DESC")
    List<Comment> getCommentsForPost(@Param("postId") String postId);
}
