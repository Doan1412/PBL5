package com.example.server.repositories;

import com.example.server.models.Entity.SharedPost;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SharePostRepository extends Neo4jRepository<SharedPost,String> {

}
