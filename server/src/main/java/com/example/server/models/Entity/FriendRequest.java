package com.example.server.models.Entity;

import com.example.server.DTO.FriendRequestDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.*;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

import java.time.LocalDateTime;

@Node("FriendRequest")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class FriendRequest {

    @Id
    @GeneratedValue(UUIDStringGenerator.class)
    private String id;
    @Property("status")
    private String status;
    @Relationship(type = "SENT_FRIEND_REQUEST", direction = Relationship.Direction.INCOMING)
    private User sender;
    @Relationship(type = "RECEIVE_FRIEND_REQUEST", direction = Relationship.Direction.OUTGOING)
    private User receiver;

    @JsonFormat(pattern="yyyy-MM-dd",timezone="Indochina")
    private LocalDateTime created_at;
    public String getSenderId(){
        return sender.getId();
    }
    public String getReceiverrId(){
        return receiver.getId();
    }

    public void accept() {
        if (this.status.equals("PENDING")) {
            this.status = "ACCEPTED";
        }
    }

    public void reject() {
        if (this.status.equals("PENDING")) {
            this.status = "REJECTED";
        }
    }
    public FriendRequestDTO toDto() {
        FriendRequestDTO dto = new FriendRequestDTO();
        dto.setId(this.id);
        dto.setSenderId(this.sender.getId());
        dto.setSenderName(this.sender.getFirstname() + " " + this.sender.getLastname());
        dto.setSenderAvatar(this.sender.getProfile().getAvatar_url());
        dto.setStatus(this.status);
        dto.setCreatedAt(this.created_at);
        dto.setSenderUsername(this.sender.getUsername() );
        
        return dto;
    }
    @Override
    public String toString() {
        return "FriendRequest{" +
                "id=" + id +
                ", receiver=" + receiver.getId() +
                ", sender=" + sender.getId()+
                ", status='" + status + '\'' +
                ", createdAt=" + created_at +
                '}';
    }


}
