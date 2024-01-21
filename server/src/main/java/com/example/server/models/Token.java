package com.example.server.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

@Node("Token")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Token {
    @Id
    @GeneratedValue(UUIDStringGenerator.class)
    private String id;

    private String token;
    public String tokenType = "BEARER";
    public boolean revoked;
    public boolean expired;
    @Relationship(type = "HAS_TOKEN", direction = Relationship.Direction.INCOMING)
    private User user;
}
