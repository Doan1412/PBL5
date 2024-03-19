package com.example.server.service;

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
}
