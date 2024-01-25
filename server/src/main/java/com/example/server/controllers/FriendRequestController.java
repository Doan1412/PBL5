package com.example.server.controllers;

import com.example.server.DTO.FriendRequestDTO;
import com.example.server.models.FriendRequest;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/unfriend/{id1}/{id2}")
    public ResponseEntity<Object> unfriend(@PathVariable String id1, @PathVariable String id2) {
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
    @GetMapping("/request/user/{user_id}")
    public ResponseEntity<Object> getListFriendRequest(@PathVariable String user_id){
        try {
            System.out.println(user_id);
            List<FriendRequestDTO> data = service.getListFriendRequest(user_id).stream().map(FriendRequest::toDto).collect(Collectors.toList());
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
}
