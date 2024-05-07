package com.example.server.controllers;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.example.server.DTO.MessageDTO;
import com.example.server.models.Entity.Message;
import com.example.server.models.Entity.User;
import com.example.server.service.ChatRoomService;
import com.example.server.service.MessageService;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private ChatRoomService chatRoomService;
    @Autowired
    private MessageService messageService;

    // @MessageMapping("/message")
    // @SendTo("/chatroom/public")
    // public Message receiveMessage(@Payload Message message){
    //     return message;
    // }

    @MessageMapping("/chatroom")
    public MessageDTO recMessage(@Payload MessageDTO message){
        System.out.println("Nhan duoc");
        Set<User> users = chatRoomService.getMembersOfChatRoom(message.getRoomId());
        users.forEach(u -> {
            simpMessagingTemplate.convertAndSendToUser(u.getId(),"/private",message);
        }); 
        messageService.sendMessage(message.getSenderId(), message.getRoomId(), message.getContent());
        System.out.println(message.toString());
        return message;
    }
}