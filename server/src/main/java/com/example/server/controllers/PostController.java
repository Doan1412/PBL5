package com.example.server.controllers;

import com.example.server.DTO.CommentDTO;
import com.example.server.DTO.PostDTO;
import com.example.server.DTO.SharePostDTO;
import com.example.server.models.Entity.Account;
import com.example.server.models.Entity.Post;
import com.example.server.models.Entity.PostAttachment;

import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
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
            String cap = URLDecoder.decode(caption, "UTF-8");
            service.sharePost(post_id, account.getId(),cap);
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
    @PutMapping("/{id}")
    public ResponseEntity<Object> putMethodName(@PathVariable String id, @RequestBody PostDTO entity) {
        try {
            Object data = service.updatePost(id, entity.getContent());
            return Respond.success(200,"I001",data);
        } catch (Exception e) {
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
    @GetMapping("/share/user/{user_id}")
    public ResponseEntity<Object> getShareUser(@PathVariable String user_id){ 
        try {
            List<SharePostDTO> data = service.getShareByUser(user_id);
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @GetMapping("/share/homepage")
    public ResponseEntity<Object> getTimelineSharePosts (
        @RequestParam int skip,
        @RequestParam int limit,
        @AuthenticationPrincipal Account account) {
        try {
            List<SharePostDTO> timelinePosts = service.getTimelineSharePosts(account.getId(), skip, limit);
            return Respond.success(200,"I001",timelinePosts);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @GetMapping("/search")
    public ResponseEntity<Object> search(@RequestParam String query, @AuthenticationPrincipal Account account) {
        try {
            List<PostDTO> posts = service.search(query,account.getId());
            return Respond.success(200,"I001",posts);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @DeleteMapping("/share/{id}")
    public ResponseEntity<Object> deleteSharePost(@PathVariable String id) {
        try {
            service.deleteSharePost(id);
            return Respond.success(200,"I001","");
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @PutMapping("share/{id}")
    public ResponseEntity<Object> updateSharePost(@PathVariable String id, @RequestBody SharePostDTO entity) {
        try {
            Object data = service.updateSharePost(id, entity.getCaption());
            return Respond.success(200,"I001",data);
        } catch (Exception e) {
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @PostMapping("/share/{post_id}/like")
    public ResponseEntity<Object> likeSharePost (@PathVariable String post_id, @AuthenticationPrincipal Account account){
        try {
            service.likeSharePost(post_id, account.getId());
            return Respond.success(200,"I001","");
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @PostMapping("/share/{post_id}/unlike")
    public ResponseEntity<Object> unlikeSharePost (@PathVariable String post_id, @AuthenticationPrincipal Account account){
        try {
            service.unlikeSharePost(post_id, account.getId());
            return Respond.success(200,"I001","");
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @PostMapping("/share/comment")
    public ResponseEntity<Object> replyShare(@RequestBody CommentDTO commentDTO, @AuthenticationPrincipal Account account) {
        try {
            Object data = service.commentSharePost(commentDTO.getPostId(),account.getId(), commentDTO.getContent(),commentDTO.getAttachments());
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
}
