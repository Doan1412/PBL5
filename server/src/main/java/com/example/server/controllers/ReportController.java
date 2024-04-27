package com.example.server.controllers;

import com.example.server.DTO.ReportRequest;
import com.example.server.models.Entity.Account;
import com.example.server.models.Entity.Report;
import com.example.server.models.Enum.ReportStatus;
import com.example.server.service.ReportService;
import com.example.server.utils.Respond;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/report")
public class ReportController {

    private final ReportService reportService;


    @PostMapping("/reportPost")
    public ResponseEntity<Object> reportPost(@RequestBody ReportRequest reportRequest,@AuthenticationPrincipal Account account) {
        try {
            reportService.reportPost(reportRequest.getPostId(), account.getId(), reportRequest.getReason());
            return Respond.success(200,"I001","");
        } catch (Exception e) {
            return Respond.fail(500,"E001",e.getMessage());
        }
    }

    @GetMapping("")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Object> get(){
        try {
            List<Report> data = reportService.getAll();
            return Respond.success(200,"I001",data);
        } catch (Exception e) {
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
    @PutMapping("/{reportId}/status")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Object> updateReportStatus(@PathVariable String reportId, @RequestParam ReportStatus newStatus) {
        reportService.updateReportStatus(reportId, newStatus);
        return Respond.success(200,"I001",reportService.getAll());
    }
    @DeleteMapping("/{reportId}")
    public ResponseEntity<String> deleteReport(@PathVariable String reportId) {
        // Gọi phương thức deleteReport từ ReportService
        reportService.deleteReportById(reportId);
        return ResponseEntity.ok("Report deleted successfully");
    }
}
