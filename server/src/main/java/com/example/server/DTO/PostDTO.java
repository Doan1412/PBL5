package com.example.server.DTO;

import com.example.server.models.Entity.Post;
import com.example.server.models.Entity.PostAttachment;
import com.example.server.models.Entity.User;
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
    private int like_count;
    private int share_count;
    private boolean isLike;
    private Set<PostAttachment> attachments = new HashSet<>();
    public void loadFromEntity(Post post, int share_count,User user) {
        this.userId =post.getUser().getId();
        this.attachments = post.getAttachments();
        this.avatarUrl = post.getUser().getProfile().getAvatar_url();
        this.content = post.getContent();
        this.created_at = post.getCreated_at();
        this.fullName = post.getUser().getFirstname()+" "+post.getUser().getLastname();
        this.id = post.getId();
        this.like_count = post.getLikes().size();
        this.isLike = post.getLikes().contains(user);
        this.share_count = share_count;
    }
}
