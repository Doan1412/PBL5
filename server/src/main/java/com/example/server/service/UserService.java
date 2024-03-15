package com.example.server.service;

import com.example.server.DTO.DisplayUserDTO;
import com.example.server.DTO.PostDTO;
import com.example.server.DTO.UserDTO;
import com.example.server.models.Post;
import com.example.server.models.Profile;
import com.example.server.models.User;
import com.example.server.repositories.FriendRequestRepository;
import com.example.server.repositories.PostRepository;
import com.example.server.repositories.ProfileRepository;
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
            Set<Object> like = new HashSet<>();
            post.getLikes().forEach(user -> {
                DisplayUserDTO userDTO = DisplayUserDTO.builder()
                        .id(user.getId())
                        .avatar_url(user.getProfile().getAvatar_url())
                        .fullname(user.getFirstname()+" "+user.getLastname())
                        .username(user.getUsername())
                        .build();
                like.add(userDTO);
            });
            PostDTO p = PostDTO.builder()
                    .userId(post.getUser().getId())
                    .attachments(post.getAttachments())
                    .avatarUrl(post.getUser().getProfile().getAvatar_url())
                    .content(post.getContent())
                    .created_at(post.getCreated_at())
                    .fullName(post.getUser().getFirstname()+" "+post.getUser().getLastname())
                    .id(post.getId())
                    .like(like)
                    .share_count(share_count)
            .build();
            data.add(p);
        }));
        return data;
    }
}
