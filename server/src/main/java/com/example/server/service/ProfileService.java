package com.example.server.service;

import com.example.server.models.Profile;
import com.example.server.models.User;
import com.example.server.repositories.ProfileRepository;
import com.example.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public Object update(String acc_id, String bio, MultipartFile avatar, MultipartFile cover){
        User user = userRepository.findByAccount_Id(acc_id).orElseThrow();
        Profile profile = user.getProfile();
        String avatar_url = save(avatar,"avatar");
        String cover_url = save(cover,"cover");
        profile.setBio(bio);
        profile.setCover_url(cover_url);
        profile.setAvatar_url(avatar_url);
        return repository.save(profile);
    }
    private String save(MultipartFile file,String type) {
        try {
            // Lưu trữ tệp trong thư mục resources/static
            String uploadDir = "src/main/resources/static/"+type+"/";

            // Đảm bảo thư mục tồn tại, nếu không tạo mới
            java.nio.file.Path uploadPath = java.nio.file.Paths.get(uploadDir).toAbsolutePath().normalize();
            java.nio.file.Files.createDirectories(uploadPath);

            // Đặt lại tên tệp để tránh trùng lặp
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            String newFileName = UUID.randomUUID().toString() + "-" + StringUtils.cleanPath(fileName);

            // Lưu tệp
            java.nio.file.Path filePath = uploadPath.resolve(newFileName).normalize();
            java.nio.file.Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Trả về đường dẫn tương đối
            return newFileName;
        } catch (Exception ex) {
            throw new RuntimeException("Lỗi khi lưu tệp đính kèm: " + ex.getMessage());
        }
    }
}
