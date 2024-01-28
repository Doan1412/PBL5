package com.example.server.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Node("Comment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {
    @Id
    @GeneratedValue(UUIDStringGenerator.class)
    private String id;

    private String content;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="Indochina")
    private LocalDateTime createdAt;

    @Relationship(type = "COMMENTED_ON", direction = Relationship.Direction.OUTGOING)
    private Post post;

    @Relationship(type = "COMMENTED_BY", direction = Relationship.Direction.OUTGOING)
    private User user;
    @Relationship(type = "LIKED_BY", direction = Relationship.Direction.INCOMING)
    private Set<User> likes = new HashSet<>();
}
