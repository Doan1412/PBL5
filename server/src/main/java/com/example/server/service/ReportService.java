package com.example.server.service;

import com.example.server.models.Post;
import com.example.server.models.Report;
import com.example.server.repositories.PostRepository;
import com.example.server.repositories.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;
    private final PostRepository postRepository;

    public void reportPost(String postId, String userId, String reason) {
        Report report = new Report();
        Post post = postRepository.findById(postId).orElseThrow();
        report.setPost(post);
        report.setUserId(userId);
        report.setReason(reason);
        report.setCreatedAt(LocalDateTime.now());
        reportRepository.save(report);
    }
}
