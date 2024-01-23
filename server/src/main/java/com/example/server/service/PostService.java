package com.example.server.service;

import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.server.models.Post;
import com.example.server.models.PostAttachment;
import com.example.server.models.User;
import com.example.server.repositories.PostAttachmentRepository;
import com.example.server.repositories.PostRepository;
import com.example.server.repositories.UserRepository;
import org.springframework.util.StringUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository repository;
    private final UserRepository userRepository;
    private final PostAttachmentRepository attachmentRepository;

    public Object create(String user_id, String content, MultipartFile[] attachments) {
        User user = userRepository.findById(user_id).orElseThrow();
        Post post = Post.builder()
                        .content(content)
                        .created_at(LocalDateTime.now())
                        .updated_at(LocalDateTime.now())
                        .user(user)
                        .build();
        for (MultipartFile attachment : attachments) {
            String attachmentUrl = saveAttachment(attachment);
            PostAttachment postAttachment = PostAttachment.builder()
                                                        .url(attachmentUrl)
                                                        .type(determineAttachmentType(attachment))
                                                        .created_at(LocalDateTime.now())
                                                        .build();
            attachmentRepository.save(postAttachment);
            post.addAttachment(postAttachment);
        }
        userRepository.save(user);
        return repository.save(post);
    }
    private String determineAttachmentType(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        if (fileName != null && (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png"))) {
            return "IMAGE";
        } else if (fileName != null && (fileName.endsWith(".mp4") || fileName.endsWith(".avi") || fileName.endsWith(".mov"))) {
            return "VIDEO";
        } else {
            return "UNKNOWN";
        }
    }
    private String saveAttachment(MultipartFile file) {
    try {
        // Lưu trữ tệp trong thư mục resources/static
        String uploadDir = "src/main/resources/static/attachments/";

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
        return "/attachments/" + newFileName;
    } catch (Exception ex) {
        throw new RuntimeException("Lỗi khi lưu tệp đính kèm: " + ex.getMessage());
    }
}

}
