package com.example.server.controllers;

import com.example.server.DTO.CommentDTO;
import com.example.server.DTO.PostDTO;
import com.example.server.models.Entity.Account;
import com.example.server.models.Entity.Post;
import com.example.server.models.Entity.PostAttachment;

import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Paths;
import java.util.List;

import org.springframework.core.io.Resource;

import com.example.server.service.PostAttachmentService;
import com.example.server.service.PostService;
import com.example.server.utils.Respond;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/post")
@RequiredArgsConstructor
public class PostController {
    private final PostService service;
    private final PostAttachmentService postAttachmentService;

    @PostMapping("/create")
    public ResponseEntity<Object> post(@RequestBody PostDTO postDTO,@AuthenticationPrincipal Account account) {
        try {
            Object data = service.create(account.getId(), postDTO.getContent(),postDTO.getAttachments());
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }

    @PostMapping("{post_id}/like")
    public ResponseEntity<Object> like (@PathVariable String post_id, @AuthenticationPrincipal Account account){
        try {
            service.likePost(post_id, account.getId());
            return Respond.success(200,"I001","");
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @PostMapping("{post_id}/unlike")
    public ResponseEntity<Object> unlike (@PathVariable String post_id, @AuthenticationPrincipal Account account){
        try {
            service.unlikePost(post_id, account.getId());
            return Respond.success(200,"I001","");
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @PostMapping("{post_id}/share")
    public ResponseEntity<Object> share (@PathVariable String post_id,@RequestParam String caption, @AuthenticationPrincipal Account account){
        try {
            service.sharePost(post_id, account.getId(),caption);
            return Respond.success(200,"I001","");
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @GetMapping("/{post_id}")
    public ResponseEntity<Object> get_by_id(@PathVariable String post_id){
        try {
            Post data = service.get_by_id(post_id);
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @DeleteMapping("/{post_id}")
    public ResponseEntity<Object> delete (@PathVariable String post_id){
        try {
            System.out.println(post_id);
            service.delete_post(post_id);
            return Respond.success(200,"I001","");
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @GetMapping("/homepage")
    public ResponseEntity<Object> getTimelinePosts(
            @RequestParam int skip,
            @RequestParam int limit,
            @AuthenticationPrincipal Account account
    ) {
        System.out.println("on");
        List<PostDTO> timelinePosts = service.getTimelinePosts(account.getId(), skip, limit);
        return Respond.success(200,"I001",timelinePosts);
    }

    @PostMapping("/comment")
    public ResponseEntity<Object> reply(@RequestBody CommentDTO commentDTO, @AuthenticationPrincipal Account account) {
        try {
            Object data = service.comment(commentDTO.getPostId(),account.getId(), commentDTO.getContent(),commentDTO.getAttachments());
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
}
