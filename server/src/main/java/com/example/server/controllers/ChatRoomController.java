package com.example.server.controllers;

import com.example.server.DTO.RoomDTO;
import com.example.server.models.Entity.Account;
import com.example.server.service.ChatRoomService;
import com.example.server.utils.Respond;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
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
    
}
