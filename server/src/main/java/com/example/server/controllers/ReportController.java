package com.example.server.controllers;

import com.example.server.DTO.ReportRequest;
import com.example.server.models.Entity.Account;
import com.example.server.models.Entity.Report;
import com.example.server.service.ReportService;
import com.example.server.utils.Respond;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/report")
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
    public ResponseEntity<Object> get(){
        try {
            List<Report> data = reportService.getAll();
            return Respond.success(200,"I001",data);
        } catch (Exception e) {
            return Respond.fail(500,"E001",e.getMessage());
        }
    }

}
