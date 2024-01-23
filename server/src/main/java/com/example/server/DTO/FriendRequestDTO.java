package com.example.server.DTO;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class FriendRequestDTO {
    private String id;
    private String senderId;
    private String senderName;
    private String senderAvatar;
    private String status;
    private LocalDateTime createdAt;

}
