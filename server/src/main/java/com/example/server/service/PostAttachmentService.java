package com.example.server.service;

import java.util.Collections;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.example.server.models.Entity.PostAttachment;
import com.example.server.repositories.PostAttachmentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostAttachmentService {
    private final PostAttachmentRepository repository;

    public PostAttachment get_id(String id) {
        return repository.findById(id).orElseThrow();
    }

    public List<String> getImgByUserId(String userId) {
        System.out.println("userId: " + userId);
        List<String> imgList = repository.getImgByUserId(userId);
        Collections.reverse(imgList);
        return imgList;
    }
}
