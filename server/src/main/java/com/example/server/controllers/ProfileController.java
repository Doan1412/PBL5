package com.example.server.controllers;

import com.example.server.models.Entity.Account;
import com.example.server.service.ProfileService;
import com.example.server.utils.Respond;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService service;

    @PutMapping("/update")
    public ResponseEntity<Object> update(@RequestParam String bio, @RequestParam MultipartFile avatar, @RequestParam MultipartFile cover,@AuthenticationPrincipal Account account){
        try {
            Object data = service.update(account.getId(),bio,avatar,cover);
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }

    }
}
