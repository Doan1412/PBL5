package com.example.server.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.server.models.Entity.PostAttachment;

@Repository
public interface PostAttachmentRepository extends Neo4jRepository<PostAttachment, String> {
    @Query("MATCH (n:Post_attachment)<-[:CONTAINS]-(:Post{id: $postId}) DETACH DELETE n")
    void deleteByPostId(@Param("postId") String postId);
    @Query("MATCH (n:Post_attachment)<-[:CONTAINS]-(:Post)<-[:POSTED_BY]-(:User{id : $userId}) RETURN n.url")
    List<String> getImgByUserId(@Param("userId") String userId);
}
