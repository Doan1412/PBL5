package com.example.server.controllers;

import com.example.server.DTO.PostDTO;
import com.example.server.DTO.UserDTO;
import com.example.server.models.Entity.User;
import com.example.server.models.Enum.AccountStatus;
import com.example.server.service.PostAttachmentService;
import com.example.server.service.UserService;
import com.example.server.utils.Respond;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;
    private final PostAttachmentService postAttachmentService;
    @GetMapping("/{id}")
    public ResponseEntity<Object> getById(@PathVariable String id) {
        try {
            User user = service.getInfoById(id);
            return Respond.success(200,"I001",user);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getStackTrace());
        }
    }

    @GetMapping("")
    public ResponseEntity<Object> getAll(){
        try {
            List<User> data= service.getAll();
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getStackTrace());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Object> update( @RequestBody  UserDTO user) {
        try {
            System.out.println(user);
            User u = service.updateInfo(user);
            return Respond.success(200,"I001",u);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
        try {
            service.delete(id);
            return Respond.success(200,"I001","");
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getStackTrace());
        }
    }
    @GetMapping("/{user_id}/post")
    public ResponseEntity<Object> get_post_by_user(@PathVariable String user_id){
        try {
            List<PostDTO> data = service.get_post_by_user(user_id);
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getStackTrace());
        }
    }
    @GetMapping("/{user_id}/img")
    public ResponseEntity<Object> get_img_by_user(@PathVariable String user_id){
        try {
            List<String> data = postAttachmentService.getImgByUserId(user_id);
            System.out.println(data);
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getStackTrace());
        }
    }
    @GetMapping("/test")
    public ResponseEntity<Object> test( @AuthenticationPrincipal UserDetails userDetails) {
        try {
            return Respond.success(200,"I001",userDetails);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getStackTrace());
        }
    }
    @PutMapping("/{userId}/ban")
    public ResponseEntity<Object> banUser(@PathVariable("userId") String userId) {
        try {
            service.updateUserStatus(userId);
            return Respond.success(200,"I001","");
        } catch (Exception e) {
            return Respond.fail(500,"E001",e.getStackTrace());
        }
    }
}
