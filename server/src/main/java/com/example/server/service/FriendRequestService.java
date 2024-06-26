package com.example.server.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.server.DTO.DisplayUserDTO;
import com.example.server.DTO.LocationDTO;
import com.example.server.DTO.UserDTO;
import com.example.server.models.Entity.ChatRoom;
import com.example.server.models.Entity.FriendRequest;
import org.springframework.stereotype.Service;

import com.example.server.models.Entity.User;
import com.example.server.repositories.ChatRoomRepository;
import com.example.server.repositories.FriendRequestRepository;
import com.example.server.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FriendRequestService {
    private final FriendRequestRepository friendRequestRepository;
    private final UserRepository repository;
    private final ChatRoomRepository chatRoomRepository;
    private final AIService aIService;

    public void addFriend(String request_id){
        FriendRequest friendRequest = friendRequestRepository.findById(request_id).orElseThrow();
        friendRequest.accept();
        System.out.println(friendRequest.getSenderId());
        User user_1 = repository.findById(friendRequest.getSenderId()).orElseThrow();
        User user_2 = repository.findById(friendRequest.getReceiverrId()).orElseThrow();
        System.out.println(user_1);
////        System.out.println(user_2);
        friendRequestRepository.addFriend(user_1.getId(), user_2.getId());
//        user_2.addFriend(user_1);
        friendRequestRepository.save(friendRequest);
        friendRequestRepository.deleteFriendRequestByUser(user_1.getId(),user_2.getId());
        repository.save(user_1);
        repository.save(user_2);
        String r = chatRoomRepository.findChatRoomByMembers(user_1.getId(),user_2.getId());
        if (r != null) return;
        Set<User> members = new HashSet<>();
        members.add(user_1);
        members.add(user_2);
        ChatRoom room = ChatRoom.builder()
                .name(user_1.getLastname()+", "+ user_2.getLastname())
                .members(members)
                .build();
        chatRoomRepository.save(room);
    }

    public List<DisplayUserDTO> unfriend(String acc_id, String id2){
        User user_1 = repository.findByAccount_Id(acc_id).orElseThrow();
        User user_2 = repository.findById(id2).orElseThrow();
        friendRequestRepository.deleteByUserId(user_1.getId(), user_2.getId());
        friendRequestRepository.deleteFriendRequestByUser(user_1.getId(),user_2.getId());
        repository.save(user_1);
        repository.save(user_2);
        List<DisplayUserDTO> data = friendRequestRepository.getListDisplayUsers(user_1.getId());
        System.out.println(data.toString());
        return data;
    }

    public void sendFriendRequest(String acc_id, String friend_id) {
        User user = repository.findByAccount_Id(acc_id).orElseThrow();
        User friend = repository.findById(friend_id).orElseThrow();
        FriendRequest friendRequest = FriendRequest.builder()
                .created_at(LocalDateTime.now())
                .status("PENDING")
                .sender(user)
                .receiver(friend)
                .build();
        friendRequestRepository.save(friendRequest);
    }

    public void rejectFriendRequest(String request_id){
        FriendRequest friendRequest = friendRequestRepository.findById(request_id).orElseThrow();
        friendRequest.reject();
        friendRequestRepository.save(friendRequest);
    }

    public void deleteFriendRequest(String request_id){
        friendRequestRepository.deleteById(request_id);
    }

    public List<FriendRequest> getListFriendRequest(String acc_id){
        User user = repository.findByAccount_Id(acc_id).orElseThrow();
//        System.out.println(user_id);
        return friendRequestRepository.findByReceiverId(user.getId());
    }
    public List<DisplayUserDTO> get_list_friend(String user_id){
        List<DisplayUserDTO> data = friendRequestRepository.getListDisplayUsers(user_id);
        System.out.println(data.toString());
        return data;
    }
    public List<FriendRequest> getListSendedFriendRequest(String acc_id){
        User user = repository.findByAccount_Id(acc_id).orElseThrow();
//        System.out.println(user_id);
        List<String> list = friendRequestRepository.getSendedFriendRequests(user.getId());
        List<FriendRequest> data = new ArrayList<>();
        for (String id : list) {
            FriendRequest friendRequest = friendRequestRepository.findById(id).orElseThrow();
            data.add(friendRequest);
        }
        return data;
    }

    public List<DisplayUserDTO> listNearByFriends(LocationDTO location, String acc_id) throws IOException {
        User user = repository.findByAccount_Id(acc_id).orElseThrow();
        List<String> fidList = new ArrayList<>();
        List<DisplayUserDTO> data = new ArrayList<>();
        location.setUser_id(user.getId());
        //Tra ve list id tai day
        fidList = aIService.nearbyFidList(location);
        for(String id : fidList){
            User friend = repository.findById(id).orElseThrow();
            DisplayUserDTO dto = new DisplayUserDTO();
            dto.loadFromEntity(friend);
            data.add(dto);
        }
        return data;
    }
    public List<DisplayUserDTO> listSuggestFriends(String acc_id) throws IOException {
        User user = repository.findByAccount_Id(acc_id).orElseThrow();
        List<String> fidList = new ArrayList<>();
        List<DisplayUserDTO> data = new ArrayList<>();
        //Tra ve list id tai day
        fidList = aIService.find_friend(user.getId());
        for(String id : fidList){
            User friend = repository.findById(id).orElseThrow();
            DisplayUserDTO dto = new DisplayUserDTO();
            dto.loadFromEntity(friend);
            data.add(dto);
        }
        return data;
    }
}
