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

import java.util.HashSet;
import java.util.Set;

@Node("room")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoom {
    @Id
    @GeneratedValue(UUIDStringGenerator.class)
    private String id;
    private String name;
    @Relationship(type = "MEMBER_OF", direction = Relationship.Direction.INCOMING)
    private Set<User> members = new HashSet<>();
}
