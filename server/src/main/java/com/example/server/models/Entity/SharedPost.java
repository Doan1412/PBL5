package com.example.server.models.Entity;

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

@Node("Share_post")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SharedPost {
    @Id
    @GeneratedValue(UUIDStringGenerator.class)
    private String id;

    private String caption;
    private LocalDateTime created_at;

    @Relationship(type = "SHARED_POST", direction = Relationship.Direction.INCOMING)
    private Post originalPost;

    @Relationship(type = "SHARED_BY", direction = Relationship.Direction.OUTGOING)
    private User sharedBy;
    @Relationship(type = "LIKED_BY", direction = Relationship.Direction.INCOMING)
    private Set<User> likes = new HashSet<>();
}
