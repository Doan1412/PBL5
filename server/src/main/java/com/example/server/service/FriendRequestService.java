package com.example.server.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.example.server.models.FriendRequest;
import org.springframework.stereotype.Service;

import com.example.server.models.User;
import com.example.server.repositories.FriendRequestRepository;
import com.example.server.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FriendRequestService {
    private final FriendRequestRepository friendRequestRepository;
    private final UserRepository repository;

    public void addFriend(String request_id){
        FriendRequest friendRequest = friendRequestRepository.findById(request_id).orElseThrow();
        friendRequest.accept();
        System.out.println(friendRequest.getSenderId());
        User user_1 = repository.findById(friendRequest.getSenderId()).orElseThrow();
        User user_2 = repository.findById(friendRequest.getReceiverrId()).orElseThrow();
        System.out.println(user_1);
////        System.out.println(user_2);
        user_1.addFriend(user_2);
//        user_2.addFriend(user_1);
        friendRequestRepository.save(friendRequest);
        repository.save(user_1);
        repository.save(user_2);
    }

    public void unfriend(String id1, String id2){
        User user_1 = repository.findById(id1).orElseThrow();
        User user_2 = repository.findById(id2).orElseThrow();
        friendRequestRepository.deleteByUserId(user_1.getId(), user_2.getId());
        user_1.getFriends().remove(user_2);
        user_2.getFriends().remove(user_1);
        repository.save(user_1);
        repository.save(user_2);
    }

    public void sendFriendRequest(String user_id, String friend_id) {
        User user = repository.findById(user_id).orElseThrow();
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

    public List<FriendRequest> getListFriendRequest(String user_id){
        System.out.println(user_id);
        return friendRequestRepository.findByReceiverId(user_id);
    }
}
