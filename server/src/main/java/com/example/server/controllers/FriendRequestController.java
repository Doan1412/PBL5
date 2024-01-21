package com.example.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.service.FriendRequestService;
import com.example.server.utils.Respond;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/friend")
@RequiredArgsConstructor
public class FriendRequestController {
    private final FriendRequestService service;

    @PostMapping("/add_friend")
    public ResponseEntity<Object> add_friend(@RequestBody String request_id) {
        try {
            service.addFriend(request_id);
            return Respond.success(200,"I001","");
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getStackTrace());
        }
    }

    @PostMapping("/unfriend")
    public ResponseEntity<Object> unfriend(@RequestBody String id1, String id2) {
        try {
            service.unfriend(id1,id2);
            return Respond.success(200,"I001","");
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getStackTrace());
        }
    }
    @PostMapping("/{user_id}/send_friend_request/{friend_id}")
    public ResponseEntity<Object> sendFriendRequest(@PathVariable String user_id, @PathVariable String friend_id){
        try {
            service.sendFriendRequest(user_id,friend_id);
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
    
}
