package com.example.server.service;

import com.example.server.models.Entity.Profile;
import com.example.server.models.Entity.User;
import com.example.server.repositories.ProfileRepository;
import com.example.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final ProfileRepository repository;
    private final UserRepository userRepository;
    public Object update(String acc_id, Profile profile_updated){
        User user = userRepository.findByAccount_Id(acc_id).orElseThrow();
        Profile profile = user.getProfile();
        profile.setBio(profile_updated.getBio());
        profile.setCover_url(profile_updated.getCover_url());
        profile.setAvatar_url(profile_updated.getAvatar_url());
        return repository.save(profile);
    }
}
