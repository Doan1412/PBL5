package com.example.server.controllers;

import com.example.server.DTO.MessageDTO;
import com.example.server.models.Entity.ChatRoom;
import com.example.server.models.Entity.Message;
import com.example.server.models.Entity.User;
import com.example.server.repositories.ChatRoomRepository;
import com.example.server.repositories.UserRepository;
import com.example.server.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
public class MessageController {
    @Autowired
    private final MessageService messageService;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private ChatRoomRepository chatRoomRepository; // Assuming you have a repository for ChatRoom

    @Autowired
    private UserRepository userRepository; 
    
    @MessageMapping("/message")
    public void send(@Payload MessageDTO msg) {
        Optional<ChatRoom> chatRoomOptional = chatRoomRepository.findById(msg.getRoomId());
        if (chatRoomOptional.isPresent()) {
            Message message = messageService.sendMessage(msg.getSenderId(), msg.getRoomId(), msg.getContent());
            ChatRoom chatRoom = chatRoomOptional.get();
            for (User member : chatRoom.getMembers()) {
                simpMessagingTemplate.convertAndSendToUser(member.getUsername(), "/chatroom", message);
            }
        }
    }
    // @MessageMapping("/private-message")
    // public Message recMessage(@Payload Message message){
    //     simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private",message);
    //     System.out.println(message.toString());
    //     return message;
    // }


//    @PostMapping("/send")
//    public ResponseEntity<Object> sendMessage(@RequestParam String senderId, @RequestParam String chatRoomId, @RequestParam String content) {
//        try {
//            Message message = messageService.sendMessage(senderId, chatRoomId, content);
//            return Respond.success(200, "I001",message);
//        }
//        catch (Exception e) {
//            return Respond.fail(500,"E001",e.getMessage());
//        }
//    }
//
//    @GetMapping("/chatroom/{chatRoomId}")
//    public ResponseEntity<Object> getMessagesInChatRoom(@PathVariable String chatRoomId) {
//        try {
//            List<Message> messages = messageService.getMessagesInChatRoom(chatRoomId);
//            return Respond.success(200,"I001",messages);
//        }
//        catch (Exception e) {
//            return Respond.fail(500,"E001",e.getMessage());
//        }
//    }
}

