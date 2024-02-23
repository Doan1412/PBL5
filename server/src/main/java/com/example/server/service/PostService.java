package com.example.server.service;

import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.UUID;

import com.example.server.DTO.PostDTO;
import com.example.server.models.SharedPost;
import com.example.server.repositories.SharePostRepository;
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
import org.webjars.NotFoundException;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository repository;
    private final UserRepository userRepository;
    private final PostAttachmentRepository attachmentRepository;
    private final SharePostRepository sharePostRepository;
    public int getLikeCount(String postId) {
        return repository.getLikeCount(postId);
    }

    public int getShareCount(String postId) {
        return repository.getShareCount(postId);
    }

    public Object create(String account_id, String content, MultipartFile[] attachments) {
        User user = userRepository.findByAccount_Id(account_id).orElseThrow();
        Post post = Post.builder()
                        .content(content)
                        .created_at(LocalDateTime.now())
                        .updated_at(LocalDateTime.now())
                        .user(user)
                        .attachments(new HashSet<>())
                        .sharedPosts(new HashSet<>())
                        .build();
        for (MultipartFile attachment : attachments) {
            String attachmentUrl = saveAttachment(attachment);
            PostAttachment postAttachment = PostAttachment.builder()
                                                        .url(attachmentUrl)
                                                        .type(determineAttachmentType(attachment))
                                                        .created_at(LocalDateTime.now())
                                                        .build();
            PostAttachment savedAttachment = attachmentRepository.save(postAttachment);
            post.addAttachment(savedAttachment);
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
            return newFileName;
        } catch (Exception ex) {
            throw new RuntimeException("Lỗi khi lưu tệp đính kèm: " + ex.getMessage());
        }
    }
    public void likePost(String postId, String acc_id) {
        Post post = repository.findById(postId).orElseThrow(() -> new NotFoundException("Post not found"));
        User user = userRepository.findByAccount_Id(acc_id).orElseThrow(()->new NotFoundException("User not found"));
        post.setLikes(post.getLikes()+1);
        repository.save(post);
    }
    public void sharePost(String postId, String acc_id, String caption) {
        User user = userRepository.findByAccount_Id(acc_id).orElseThrow();
        Post originalPost = repository.findById(postId).orElseThrow(() -> new NotFoundException("Post not found"));

        SharedPost sharedPost = new SharedPost();
        sharedPost.setCaption(caption);
        sharedPost.setOriginalPost(originalPost);
        sharedPost.setSharedBy(user);

        originalPost.getSharedPosts().add(sharedPost);

        sharePostRepository.save(sharedPost);
        repository.save(originalPost);
    }
    public Post get_by_id(String post_id){
        Post post = repository.findById(post_id).orElseThrow(() -> new NotFoundException("Post not found"));
        return post;
    }
    public void delete_post(String post_id){
        attachmentRepository.deleteByPostId(post_id);
        repository.deleteById(post_id);
    }

}
