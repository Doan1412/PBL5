package com.example.server.DTO;

import com.example.server.models.Entity.PostAttachment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {
    private String content;
    private String postId;
    private int like_count;
    private List<PostAttachment> attachment;
}
