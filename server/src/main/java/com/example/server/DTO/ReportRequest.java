package com.example.server.DTO;

import lombok.Data;

@Data
public class ReportRequest {
    private String postId;
    private String reason;

}