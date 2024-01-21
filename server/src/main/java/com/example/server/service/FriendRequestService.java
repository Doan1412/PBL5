package com.example.server.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.server.models.FriendRequest;
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
        friendRequestRepository.save(friendRequest);
        Map<String,Object> users = friendRequestRepository.findUsersByFriendRequestId(request_id).orElseThrow();
        User user_1 = (User) users.get("u1");
        User user_2 = (User) users.get("u2");
        user_1.addFriend(user_2);
        user_2.addFriend(user_1);
        repository.save(user_1);
        repository.save(user_2);
    }

    public void unfriend(String id1, String id2){
        User user_1 = repository.findById(id1).orElseThrow();
        User user_2 = repository.findById(id2).orElseThrow();
        user_1.removeFriend(user_2);
        user_2.removeFriend(user_1);
        repository.save(user_1);
        repository.save(user_2);
    }

    public void sendFriendRequest(String user_id, String friend_id) {
        User user = repository.findById(user_id).orElseThrow();
        User friend = repository.findById(friend_id).orElseThrow();
        user.sendFriendRequest(friend, "PENDING");
        repository.save(user);
    }

    public void rejectFriendRequest(String request_id){
        FriendRequest friendRequest = friendRequestRepository.findById(request_id).orElseThrow();
        friendRequest.reject();
        friendRequestRepository.save(friendRequest);
    }

    public void deleteFriendRequest(String request_id){
        friendRequestRepository.deleteById(request_id);
    }
}
