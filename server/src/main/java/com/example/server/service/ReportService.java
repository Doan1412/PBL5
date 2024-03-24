package com.example.server.service;

import com.example.server.models.Entity.Post;
import com.example.server.models.Entity.Report;
import com.example.server.models.Entity.User;
import com.example.server.models.Enum.ReportStatus;
import com.example.server.repositories.PostRepository;
import com.example.server.repositories.ReportRepository;
import com.example.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    public void reportPost(String postId, String acc_id, String reason) {
        User user = userRepository.findByAccount_Id(acc_id).orElseThrow();
        Report report = new Report();
        Post post = postRepository.findById(postId).orElseThrow();
        report.setPost(post);
        report.setUser(user);
        report.setReason(reason);
        report.setCreatedAt(LocalDateTime.now());
        report.setStatus(ReportStatus.UNVIEWED.name());
        reportRepository.save(report);
    }

    public List<Report> getAll(){
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        List<Report> data = reportRepository.findAll(sort);
        reportRepository.setStatusToViewed();
        return data;
    }
}
