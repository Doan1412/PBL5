package com.example.server.repositories;

import com.example.server.models.Report;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface ReportRepository extends Neo4jRepository<Report, Long> {

}
