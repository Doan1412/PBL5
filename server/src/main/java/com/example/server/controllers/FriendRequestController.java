package com.example.server.controllers;

import com.example.server.DTO.DisplayUserDTO;
import com.example.server.DTO.FriendRequestDTO;
import com.example.server.DTO.LocationDTO;
import com.example.server.DTO.UserDTO;
import com.example.server.models.Entity.Account;
import com.example.server.models.Entity.FriendRequest;
import com.example.server.models.Entity.User;
import com.example.server.service.ChatRoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.example.server.service.FriendRequestService;
import com.example.server.utils.Respond;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/friend")
@RequiredArgsConstructor
public class FriendRequestController {
    private final FriendRequestService service;

    @PostMapping("/add_friend/{request_id}")
    public ResponseEntity<Object> add_friend(@PathVariable String request_id) {
        try {
            service.addFriend(request_id);
            return Respond.success(200,"I001","");
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }

    @PostMapping("/unfriend/{id1}")
    public ResponseEntity<Object> unfriend(@PathVariable String id1,  @AuthenticationPrincipal Account account) {
        try {
            List<DisplayUserDTO>data = service.unfriend(account.getId(),id1);
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @PostMapping("/send_friend_request/{friend_id}")
    public ResponseEntity<Object> sendFriendRequest(@PathVariable String friend_id,@AuthenticationPrincipal Account account){
        try {
            service.sendFriendRequest(account.getId(),friend_id);
            return Respond.success(200,"I001","");
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getStackTrace());
        }
    }

    @PostMapping("/reject/{request_id}")
    public ResponseEntity<Object> rejectFriendRequest(@PathVariable String request_id) {
        try {
            service.rejectFriendRequest(request_id);
            return Respond.success(200,"I001","");
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getStackTrace());
        }
    }
    @GetMapping("/request")
    public ResponseEntity<Object> getListFriendRequest(@AuthenticationPrincipal Account account){
        try {
//            System.out.println(user_id);
            List<FriendRequestDTO> data = service.getListFriendRequest(account.getId()).stream().map(FriendRequest::toDto).collect(Collectors.toList());
            System.out.println(data);
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }

    @DeleteMapping("/cancel/{request_id}")
    public  ResponseEntity<Object> cancel(@PathVariable String request_id) {
        try {
            service.deleteFriendRequest(request_id);
            return Respond.success(200,"I001","");
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @GetMapping("/list/{user_id}")
    public ResponseEntity<Object> get_list_friend(@PathVariable String user_id){
        try {
            System.out.println(user_id);
            List<DisplayUserDTO> data = service.get_list_friend(user_id);
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @PostMapping("/nearby")
    public ResponseEntity<Object> listNearByFriends(@RequestBody LocationDTO location,  @AuthenticationPrincipal Account account) {
        try {
            List<User> data = service.listNearByFriends(location,account.getId());
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @PostMapping("/suggest")
    public ResponseEntity<Object> listSuggestFriends(@AuthenticationPrincipal Account account) {
        try {
            List<User> data = service.listSuggestFriends(account.getId());
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
}