package com.example.server.service;

import com.example.server.DTO.MessageDTO;
import com.example.server.DTO.RoomDTO;
import com.example.server.models.Entity.ChatRoom;
import com.example.server.models.Entity.User;
import com.example.server.repositories.ChatRoomRepository;
import com.example.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    public ChatRoom addMemberToChatRoom(String chatRoomId, String userId) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new NotFoundException("Chat room not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        chatRoom.getMembers().add(user);
        return chatRoomRepository.save(chatRoom);
    }

    public void removeMemberFromChatRoom(String chatRoomId, String accId) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new NotFoundException("Chat room not found"));

        User user = userRepository.findByAccount_Id(accId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        chatRoom.getMembers().remove(user);
        chatRoomRepository.save(chatRoom);
    }

    public Set<User> getMembersOfChatRoom(String chatRoomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new NotFoundException("Chat room not found"));

        return chatRoom.getMembers();
    }

    public ChatRoom create(RoomDTO roomDTO) {
        ChatRoom room = ChatRoom.builder()
                .name(roomDTO.getName())
                .members(new HashSet<>())
                .build();
        roomDTO.getMembers_id().forEach((member_id)->{
            User user = userRepository.findById(member_id)
                    .orElseThrow(() -> new NotFoundException("User not found"));
            room.getMembers().add(user);
        });
        return chatRoomRepository.save(room);
    }
    public ChatRoom createPrivateChatRoom(String user_id1, String user_id2){
        User user1 = userRepository.findById(user_id1).orElseThrow();
        User user2 = userRepository.findById(user_id2).orElseThrow();
        Set<User> members = new HashSet<>();
        members.add(user1);
        members.add(user2);
        ChatRoom room = ChatRoom.builder()
                .name(user1.getLastname()+", "+ user2.getLastname())
                .members(members)
                .build();
        return chatRoomRepository.save(room);
    }
    public void deleteChatRoom(String id){
        chatRoomRepository.deleteById(id);
    }
    public ChatRoom getChatRoom(String id){
        return chatRoomRepository.findById(id).orElseThrow();
    }
    public Set<ChatRoom> getChatRooms(String acc_id){
        User user = userRepository.findByAccount_Id(acc_id).orElseThrow();
        List<String> chatroom_ids = chatRoomRepository.findChatRoomByUserId(user.getId());
        System.out.println(chatroom_ids);
        Set<ChatRoom> chatRooms = new HashSet<>();
        chatroom_ids.forEach((id)->{
            chatRooms.add(chatRoomRepository.findById(id).orElseThrow());
        });
        return chatRooms;
    }
    public ChatRoom findChatRoom(String id){
        return chatRoomRepository.findById(id).orElseThrow();
    }

    public List<MessageDTO> getMessages(String id, int page, int size) {
        if (page<1){
            page = 1;
        }
        List<MessageDTO> messages = chatRoomRepository.getMessages(id, (page-1)*size, size);
        return messages;
    }

}
