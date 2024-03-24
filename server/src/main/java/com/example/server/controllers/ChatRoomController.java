package com.example.server.controllers;

import com.example.server.DTO.RoomDTO;
import com.example.server.models.Entity.Account;
import com.example.server.service.ChatRoomService;
import com.example.server.utils.Respond;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class ChatRoomController {
    private ChatRoomService service;
    @PostMapping("")
    public ResponseEntity<Object> addOne(@AuthenticationPrincipal Account account,@RequestBody RoomDTO roomDTO) {
        try {
            Object data = service.create(account.getId(), roomDTO);
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
}
