package com.example.server.service;

import com.example.server.models.ChatRoom;
import com.example.server.models.Message;
import com.example.server.models.User;
import com.example.server.repositories.ChatRoomRepository;
import com.example.server.repositories.MessageRepository;
import com.example.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ChatRoomRepository chatRoomRepository;
    public Message sendMessage(String senderId, String chatRoomId, String content) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new NotFoundException("Sender not found"));

        ChatRoom room = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new NotFoundException("Chat room not found"));

        Message message = Message.builder()
                .sender(sender)
                .room(room)
                .content(content)
                .timestamp(new Date())
                .build();
        return messageRepository.save(message);
    }

    public List<Message> getMessagesInChatRoom(String chatRoomId) {
        ChatRoom room = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new NotFoundException("Chat room not found"));

        return messageRepository.findByRoomId(room.getId());
    }
}
