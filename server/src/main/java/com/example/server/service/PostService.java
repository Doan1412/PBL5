package com.example.server.service;

import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.*;

import com.example.server.DTO.PostDTO;
import com.example.server.DTO.SharePostDTO;
import com.example.server.models.Entity.Comment;
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

    public PostDTO create(String account_id, String content, Set<PostAttachment> attachments) {
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
        if (attachments == null) {
            attachments = new HashSet<>();
        }
        attachments.forEach(attachment -> {
            String attachmentUrl = attachment.getUrl();
            PostAttachment postAttachment = PostAttachment.builder()
                                                        .url(attachmentUrl)
                                                        .type(attachment.getType())
                                                        .created_at(LocalDateTime.now())
                                                        .build();
            PostAttachment savedAttachment = attachmentRepository.save(postAttachment);
            post.addAttachment(savedAttachment);
        });
        Post savedPost = repository.save(post);
        // user.
        userRepository.save(user);
        PostDTO res = new PostDTO();
        res.loadFromEntity(savedPost, 0, user);
        return res;
    }
    public PostDTO comment(String post_id, String account_id, String content, Set<PostAttachment> attachments) {
        PostDTO comment = create(account_id,content,attachments);
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
    public void likePost(String postId, String acc_id) {
        Post post = repository.findById(postId).orElseThrow(() -> new NotFoundException("Post not found"));
        User user = userRepository.findByAccount_Id(acc_id).orElseThrow(()->new NotFoundException("User not found"));
        post.getLikes().add(user);
        repository.save(post);
    }
    public void unlikePost(String postId, String acc_id) {
        // Tìm kiếm bài đăng
        Post post = repository.findById(postId).orElseThrow(() -> new NotFoundException("Post not found"));
        
        // Tìm kiếm người dùng
        User user = userRepository.findByAccount_Id(acc_id).orElseThrow(() -> new NotFoundException("User not found"));
        
        // Loại bỏ sự thích của người dùng khỏi danh sách thích của bài đăng
        post.getLikes().remove(user);
        
        // Lưu bài đăng
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
        repository.deleteComment(post_id);
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
    public List<PostDTO> getCommentsForPost(String postId) {
        List<String> data_id = repository.getCommentsForPost(postId);
        List<PostDTO> data = new ArrayList<>();
        for (String post_id : data_id) {
            Post post = repository.findById(post_id).orElseThrow();
            int share_count = repository.getShareCount(post_id);
            PostDTO p = new PostDTO();
            p.loadFromEntity(post,share_count,post.getUser());
            data.add(p);
        }
        return data;
    }

    public PostDTO updatePost(String id, String content) {
        Post post = repository.findById(id).orElseThrow();
        post.setContent(content);
        post.setUpdated_at(LocalDateTime.now());
        repository.save(post);
        int share_count = repository.getShareCount(id);
        PostDTO p = new PostDTO();
        p.loadFromEntity(post,share_count,post.getUser());
        return p;
    }
    public List<SharePostDTO> getTimelineSharePosts(String acc_id, int skip, int limit) {
        User user = userRepository.findByAccount_Id(acc_id).orElseThrow();
        List<String> list = sharePostRepository.getTimelineSharePosts(user.getId(), skip, limit);
        List<SharePostDTO> data = new ArrayList<>();
        list.forEach((post_id -> {
            SharedPost post = sharePostRepository.findById(post_id).orElseThrow();
            SharePostDTO p = new SharePostDTO();
            p.loadFromEntity(post,user);
            data.add(p);
        }));
        return data;
    }
    public List<SharePostDTO> getShareByUser (String userId) {
        List<String> list = sharePostRepository.getShareByUser(userId);
        List<SharePostDTO> data = new ArrayList<>();
        list.forEach((post_id -> {
            SharedPost post = sharePostRepository.findById(post_id).orElseThrow();
            SharePostDTO p = new SharePostDTO();
            p.loadFromEntity(post,post.getSharedBy());
            data.add(p);
        }));
        return data;
    }

    public List<PostDTO> search(String query) {
        try {
            List<String> list = new ArrayList<>();
            //Goi api o day
            //Tra ve list id post ở đây list = ...
            List<PostDTO> data = new ArrayList<>();
            list.forEach((post_id -> {
                Post post = repository.findById(post_id).orElseThrow();
                int share_count = repository.getShareCount(post_id);
                PostDTO p = new PostDTO();
                p.loadFromEntity(post,share_count,post.getUser());
                data.add(p);
            }));
            return data;
        } catch (Exception e) {
            throw e;
        }
    }
    public void deleteSharePost(String postId) {
        sharePostRepository.deleteById(postId);
    }
    public SharePostDTO updateSharePost(String postId, String caption){
        SharedPost post = sharePostRepository.findById(postId).orElseThrow();
        post.setCaption(caption);
        // post.setUpdated_at(LocalDateTime.now());
        sharePostRepository.save(post);
        SharePostDTO p = new SharePostDTO();
        p.loadFromEntity(post,post.getSharedBy());
        return p;
    }
}
