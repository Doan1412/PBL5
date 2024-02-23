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
import java.util.List;
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
    @Relationship(type = "MEMBER_OF", direction = Relationship.Direction.INCOMING)
    Set<User> members = new HashSet<>();
}
