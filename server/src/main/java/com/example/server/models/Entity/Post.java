package com.example.server.models.Entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Node("Post")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {
    @Id
    @GeneratedValue(UUIDStringGenerator.class)
    private String id;
    @NotBlank
    private String content;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    @Relationship(type = "LIKED_BY", direction = Relationship.Direction.INCOMING)
    private Set<User> likes = new HashSet<>();
    @Relationship(type = "POSTED_BY", direction = Relationship.Direction.INCOMING)
    private User user;
    @Relationship(type = "CONTAINS", direction = Relationship.Direction.OUTGOING)
    private Set<PostAttachment> attachments = new HashSet<>();
    @Relationship(type = "COMMENTED_ON", direction = Relationship.Direction.INCOMING)
    private Set<Post> comments = new HashSet<>();

    public void addAttachment(PostAttachment attachment) {
        this.attachments.add(attachment);
    }
}
