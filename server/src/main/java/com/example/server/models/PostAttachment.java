package com.example.server.models;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Node("Post_attachment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostAttachment {
    @Id
    @GeneratedValue(UUIDStringGenerator.class)
    private String id;
    private String url;
    private String type;
}
