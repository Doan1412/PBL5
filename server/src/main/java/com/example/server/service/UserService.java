package com.example.server.service;

import com.example.server.DTO.UserDTO;
import com.example.server.models.Profile;
import com.example.server.models.User;
import com.example.server.repositories.FriendRequestRepository;
import com.example.server.repositories.ProfileRepository;
import com.example.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;

    public List<User> getAll (){
        return repository.findAll();
    }
    public User getInfoById(String id){
        return repository.findById(id).orElseThrow();
    }

    public User updateInfo(UserDTO user){
        User u = repository.findById(user.getId()).orElseThrow();
        u.setFirstname(user.getFirstname());
        u.setBirth(user.getBirth());
        u.setGender(user.getGender());
        u.setPhone(user.getPhone());
        u.setLastname(user.getLastname());
        u.setUsername(user.getUsername());
        return repository.save(u);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
}
