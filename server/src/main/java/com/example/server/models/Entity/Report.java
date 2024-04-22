package com.example.server.models.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Node("Report")
public class Report {
    @Id
    @GeneratedValue(UUIDStringGenerator.class)
    private String id;
    private Post post;
    private User user;
    private String reason;
    private LocalDateTime createdAt;
    private String status;
}

