package com.example.server.service;

import com.example.server.DTO.DisplayUserDTO;
import com.example.server.DTO.PostDTO;
import com.example.server.DTO.UserDTO;
import com.example.server.models.Entity.Post;
import com.example.server.models.Entity.Profile;
import com.example.server.models.Entity.User;
import com.example.server.models.Enum.AccountStatus;
import com.example.server.repositories.AccountRepository;
import com.example.server.repositories.FriendRequestRepository;
import com.example.server.repositories.PostRepository;
import com.example.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final PostRepository postRepository;
    private final AccountRepository accountRepository;
    private final FriendRequestRepository friendRepository;
    private final AIService aIService;
    public List<User> getAll (){
        return repository.findAll();
    }
    public UserDTO getInfoById(String id, String acc_id){
        User user =  repository.findById(id).orElseThrow();
        UserDTO dto = user.toDto();
        User me = repository.findByAccount_Id(acc_id).orElseThrow();
        if (friendRepository.isFriend(id, me.getId())) {
            dto.setFriend(true);
        }
        else {
            dto.setFriend(false);
        }
        return dto;
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
                    .from("")
                    .work_at("")
                    .study_at("")
                    .relationship("")
                    .build();
            u.setProfile(profile);
        }
        return repository.save(u);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
    public List<PostDTO> get_post_by_user (String user_id, String acc_id){
        User u = repository.findByAccount_Id(acc_id).orElseThrow();
        List<String> post_ids = postRepository.findByUserId(user_id);
        List<Post> list = new ArrayList<>();
        for (String postId : post_ids) {
            Post p = postRepository.findById(postId).orElseThrow();
            list.add(p);
        }
        list = list.stream()
                .sorted(Comparator.comparing(Post::getCreated_at).reversed()
                )
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
            p.loadFromEntity(post,share_count,u);
            data.add(p);
        }));
        return data;
    }

    public void updateUserStatus(String userId) {
        accountRepository.updateUserStatus(userId,AccountStatus.BANNED.name());
        accountRepository.banAccount(userId);
    }
    public List<DisplayUserDTO> search(String acc_id, String query) throws IOException {
        User user = repository.findByAccount_Id(acc_id).orElseThrow();
        List<String> idList = new ArrayList<>();
        List<DisplayUserDTO> data = new ArrayList<>();
        //Tra ve list id tai day
        idList = aIService.find_user(user.getId(),query);
        for(String id : idList){
            User friend = repository.findById(id).orElseThrow();
            DisplayUserDTO dto = new DisplayUserDTO();
            dto.loadFromEntity(friend);
            data.add(dto);
        }
        return data;
    }
}
