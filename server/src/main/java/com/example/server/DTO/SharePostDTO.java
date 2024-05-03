package com.example.server.DTO;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.springframework.data.neo4j.core.schema.Relationship;

import com.example.server.models.Entity.Post;
import com.example.server.models.Entity.SharedPost;
import com.example.server.models.Entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SharePostDTO {
    private String id;
    private String caption;
    private LocalDateTime created_at;
    private PostDTO originalPost;
    private DisplayUserDTO sharedBy;
    private int like_count;
    private boolean isLike;

    public void loadFromEntity(SharedPost post, User user) {
        this.id = post.getId();
        this.caption = post.getCaption();
        this.created_at = post.getCreated_at();
        this.originalPost = new PostDTO();
        this.originalPost.loadFromEntity(post.getOriginalPost(), 0, user);
        this.sharedBy = new DisplayUserDTO();
        this.sharedBy.loadFromEntity(post.getSharedBy());
        this.like_count = post.getLikes().size();
        this.isLike = post.getLikes().contains(post.getSharedBy());
    }
}
