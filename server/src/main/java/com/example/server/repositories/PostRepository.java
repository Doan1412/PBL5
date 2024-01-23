package com.example.server.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import com.example.server.models.Post;

@Repository
public interface PostRepository extends Neo4jRepository<Post, String> {
    
}
