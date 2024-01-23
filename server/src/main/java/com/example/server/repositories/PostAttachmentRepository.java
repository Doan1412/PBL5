package com.example.server.repositories;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import com.example.server.models.PostAttachment;

@Repository
public interface PostAttachmentRepository extends Neo4jRepository<PostAttachment, String> {
    
}
