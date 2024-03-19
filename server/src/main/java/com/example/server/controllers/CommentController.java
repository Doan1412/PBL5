package com.example.server.controllers;

import com.example.server.DTO.CommentDTO;
import com.example.server.models.Entity.Account;
import com.example.server.models.Entity.Comment;
import com.example.server.service.CommentService;
import com.example.server.utils.Respond;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/add")
    public ResponseEntity<Object> addComment(@RequestBody CommentDTO commentDto,@AuthenticationPrincipal Account account) {
        try {
            Comment comment = commentService.addComment(commentDto, account.getId());
            return Respond.success(200,"I001",comment);
        }
        catch (Exception e) {
            return Respond.fail(500,"E001",e.getMessage());
        }
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<Object> getCommentsForPost(@PathVariable String postId) {
        try {
            List<Comment> comments = commentService.getCommentsForPost(postId);
            return Respond.success(200,"I001",comments);
        }
        catch (Exception e) {
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
}
