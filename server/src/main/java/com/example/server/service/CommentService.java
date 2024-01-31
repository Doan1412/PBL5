package com.example.server.service;

import com.example.server.DTO.CommentDTO;
import com.example.server.models.Comment;
import com.example.server.models.Post;
import com.example.server.models.User;
import com.example.server.repositories.CommentRepository;
import com.example.server.repositories.PostRepository;
import com.example.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    public Comment addComment(CommentDTO commentDto, String acc_id) {
        Comment comment = new Comment();
        comment.setContent(commentDto.getContent());
        comment.setCreatedAt(LocalDateTime.now());

        Post post = postRepository.findById(commentDto.getPostId())
                .orElseThrow(() -> new NotFoundException("Post not found"));

        User user = userRepository.findByAccount_Id(acc_id)
                .orElseThrow(() -> new NotFoundException("User not found"));

        comment.setPost(post);
        comment.setUser(user);
        comment.setLikes(new HashSet<>());
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsForPost(String postId) {
        List<Comment> data = commentRepository.findByPostId(postId);
        data.sort(Comparator.comparing(Comment::getCreatedAt));
        return data;
    }
    public void deleteComment(String id){
        commentRepository.deleteById(id);
    }

}
