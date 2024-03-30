package com.example.server.repositories;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.server.models.Entity.PostAttachment;

@Repository
public interface PostAttachmentRepository extends Neo4jRepository<PostAttachment, String> {
    @Query("MATCH (n:Post_attachment)<-[:CONTAINS]-(:Post{id: $postId}) DETACH DELETE n")
    void deleteByPostId(@Param("postId") String postId);
}
