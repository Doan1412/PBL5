package com.example.server.service;

import com.example.server.models.ChatRoom;
import com.example.server.models.User;
import com.example.server.repositories.ChatRoomRepository;
import com.example.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    public void addMemberToChatRoom(String chatRoomId, String userId) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new NotFoundException("Chat room not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        chatRoom.getMembers().add(user);
        chatRoomRepository.save(chatRoom);
    }

    public void removeMemberFromChatRoom(String chatRoomId, String userId) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new NotFoundException("Chat room not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        chatRoom.getMembers().remove(user);
        chatRoomRepository.save(chatRoom);
    }

    public Set<User> getMembersOfChatRoom(String chatRoomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new NotFoundException("Chat room not found"));

        return chatRoom.getMembers();
    }
}
