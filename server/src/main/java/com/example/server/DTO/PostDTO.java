package com.example.server.DTO;

import com.example.server.models.PostAttachment;
import com.example.server.models.User;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDTO {
    private String id;
    @NotBlank
    private String content;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private String userId;
    private String fullName;
    private String avatarUrl;
    private Set<Object> like;
    private int share_count;
    private Set<PostAttachment> attachments = new HashSet<>();
}
