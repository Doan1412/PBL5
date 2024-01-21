package com.example.server.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.*;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

import java.time.LocalDateTime;

@RelationshipProperties
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FriendRequest {

    @Id
    @GeneratedValue(UUIDStringGenerator.class)
    private String id;

    @TargetNode
    private User receiver;

    @Property("status")
    private String status;

    @Property("created_at")
    private LocalDateTime createdAt;

    public void accept() {
        if (this.status == "PENDING") {
            this.status = "ACCEPTED";
        }
    }

    public void reject() {
        if (this.status == "PENDING") {
            this.status = "REJECTED";
        }
    }

}
