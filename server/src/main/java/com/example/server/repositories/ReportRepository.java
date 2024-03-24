package com.example.server.repositories;

import com.example.server.models.Entity.Report;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

public interface ReportRepository extends Neo4jRepository<Report, Long> {
    @Query("MATCH (r:Report) SET r.status = 'VIEWED' RETURN r")
    Report setStatusToViewed();
}
