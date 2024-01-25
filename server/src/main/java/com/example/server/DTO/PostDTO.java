package com.example.server.DTO;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

public class PostDTO {
    private String id;
    @NotBlank
    private String content;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    
}
