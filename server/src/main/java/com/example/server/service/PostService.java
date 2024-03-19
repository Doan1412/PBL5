package com.example.server.service;

import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.*;

import com.example.server.DTO.PostDTO;
import com.example.server.models.Entity.Post;
import com.example.server.models.Entity.PostAttachment;
import com.example.server.models.Entity.SharedPost;
import com.example.server.models.Entity.User;
import com.example.server.repositories.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
//    public int getLikeCount(String postId) {
//        return repository.getLikeCount(postId);
//    }

    public int getShareCount(String postId) {
        return repository.getShareCount(postId);
    }

    public Post create(String account_id, String content, MultipartFile[] attachments) {
        User user = userRepository.findByAccount_Id(account_id).orElseThrow();
        Post post = Post.builder()
                        .content(content)
                        .created_at(LocalDateTime.now())
                        .updated_at(LocalDateTime.now())
                        .user(user)
                        .attachments(new HashSet<>())
                        .comments(new HashSet<>())
//                        .sharedPosts(new HashSet<>())
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
    public Post comment(String post_id, String account_id, String content, MultipartFile[] attachments) {
        Post comment = create(account_id,content,attachments);
        repository.addCommentToPost(post_id,comment.getId());
        return comment;
    }
//    public List<PostDTO> get_comment(String post_id){
//        Post post = repository.findById(post_id).orElseThrow();
//        List<PostDTO> comments = new ArrayList<>();
//        post.getComments().forEach(cmt -> {
//            PostDTO dto = new PostDTO();
//            cmt.getLikes()
//            dto.loadFromEntity(cmt,);
//
//        });
//    }
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
        post.getLikes().add(user);
        repository.save(post);
    }
    public void sharePost(String postId, String acc_id, String caption) {
        User user = userRepository.findByAccount_Id(acc_id).orElseThrow();
        Post originalPost = repository.findById(postId).orElseThrow(() -> new NotFoundException("Post not found"));

        SharedPost sharedPost = new SharedPost();
        sharedPost.setCaption(caption);
        sharedPost.setOriginalPost(originalPost);
        sharedPost.setSharedBy(user);

//        originalPost.getSharedPosts().add(sharedPost);

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
    public List<PostDTO> getTimelinePosts(String acc_id, int skip, int limit) {
        System.out.println(acc_id);
        User user = userRepository.findByAccount_Id(acc_id).orElseThrow(()->new NotFoundException("User not found"));
        System.out.println("on");
        List<String> list = repository.getTimelinePosts(user.getId(), skip, limit);
        System.out.println(list);
        List<PostDTO> data = new ArrayList<>();
        list.forEach((post_id -> {
            Post post = repository.findById(post_id).orElseThrow();
            int share_count = repository.getShareCount(post_id);
            PostDTO p = new PostDTO();
            p.loadFromEntity(post,share_count,user);
            data.add(p);
        }));
        return data;
    }
}
