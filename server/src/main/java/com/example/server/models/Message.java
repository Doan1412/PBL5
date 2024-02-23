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

import java.util.Date;

@Node("message")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Message {
    @Id
    @GeneratedValue(UUIDStringGenerator.class)
    private String id;
    private String chatId;
    @Relationship(type = "SENT_MESSAGE", direction = Relationship.Direction.INCOMING)
    private User sender;
    @Relationship(type = "RECIPIENT_MESSAGE", direction = Relationship.Direction.INCOMING)
    private ChatRoom room;
    private String content;
    private Date timestamp;
}
