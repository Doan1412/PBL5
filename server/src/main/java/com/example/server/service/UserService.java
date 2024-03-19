package com.example.server.service;

import com.example.server.DTO.PostDTO;
import com.example.server.DTO.UserDTO;
import com.example.server.models.Entity.Post;
import com.example.server.models.Entity.Profile;
import com.example.server.models.Entity.User;
import com.example.server.models.Enum.AccountStatus;
import com.example.server.repositories.AccountRepository;
import com.example.server.repositories.PostRepository;
import com.example.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final PostRepository postRepository;
    private final AccountRepository accountRepository;
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
        if(u.getProfile() == null){
            var profile = Profile.builder()
                    .avatar_url("")
                    .bio("")
                    .cover_url("")
                    .build();
            u.setProfile(profile);
        }
        return repository.save(u);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
    public List<PostDTO> get_post_by_user (String user_id){
        List<Post> list = postRepository.findByUserId(user_id).stream()
                .sorted(Comparator.comparing(Post::getCreated_at))
                .collect(Collectors.toList());;
        List<PostDTO> data = new ArrayList<>();
        list.forEach((post -> {
            int share_count = postRepository.getShareCount(post.getId());
//            Set<DisplayUserDTO> like = new HashSet<>();
//            post.getLikes().forEach(user -> {
//                DisplayUserDTO userDTO = DisplayUserDTO.builder()
//                        .id(user.getId())
//                        .avatar_url(user.getProfile().getAvatar_url())
//                        .fullname(user.getFirstname()+" "+user.getLastname())
//                        .username(user.getUsername())
//                        .build();
//                like.add(userDTO);
//            });
            PostDTO p = new PostDTO();
            p.loadFromEntity(post,share_count,post.getUser());
            data.add(p);
        }));
        return data;
    }

    public void updateUserStatus(String userId) {
        accountRepository.updateUserStatus(userId,AccountStatus.BANNED.name());
        accountRepository.banAccount(userId);
    }
}
