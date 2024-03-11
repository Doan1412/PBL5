package com.example.server.controllers;

import com.example.server.models.Comment;
import com.example.server.models.Message;
import com.example.server.service.MessageService;
import com.example.server.utils.Respond;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;


    @PostMapping("/send")
    public ResponseEntity<Object> sendMessage(@RequestParam String senderId, @RequestParam String chatRoomId, @RequestParam String content) {
        try {
            Message message = messageService.sendMessage(senderId, chatRoomId, content);
            return Respond.success(200,"I001",message);
        }
        catch (Exception e) {
            return Respond.fail(500,"E001",e.getMessage());
        }
    }

    @GetMapping("/chatroom/{chatRoomId}")
    public ResponseEntity<Object> getMessagesInChatRoom(@PathVariable String chatRoomId) {
        try {
            List<Message> messages = messageService.getMessagesInChatRoom(chatRoomId);
            return Respond.success(200,"I001",messages);
        }
        catch (Exception e) {
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
}

