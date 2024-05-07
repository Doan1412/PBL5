package com.example.server.controllers;

import com.example.server.DTO.RoomDTO;
import com.example.server.models.Entity.Account;
import com.example.server.service.ChatRoomService;
import com.example.server.utils.Respond;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/v1/room")
@RequiredArgsConstructor
public class ChatRoomController {
    @Autowired
    private final ChatRoomService service;
    @PostMapping("")
    public ResponseEntity<Object> addOne(@RequestBody RoomDTO roomDTO) {
        try {
            Object data = service.create(roomDTO);
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @PostMapping("/create")
    public ResponseEntity<Object> createRoom(@RequestBody RoomDTO entity) {
        try {
            Object data = service.create(entity);
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    
    @GetMapping("")
    public ResponseEntity<Object> getChatRooms(@AuthenticationPrincipal Account account) {
        try {
            System.out.println(account.getId());
            Object data = service.getChatRooms(account.getId());
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<Object> getChatRoom(@PathVariable String id) {
        try {
            Object data = service.findChatRoom(id);
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @GetMapping("/{id}/messages")
    public ResponseEntity<Object> getMessages(@PathVariable String id, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        try {
            Object data = service.getMessages(id, page, size);
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    
}
