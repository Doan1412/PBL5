package com.example.server.controllers;

import com.example.server.DTO.AccountDTO;
import com.example.server.DTO.RegisterRequest;
import com.example.server.service.AuthenticationService;
import com.example.server.utils.Respond;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<Object> register(
            @RequestBody RegisterRequest request
    ) {
       try {
            System.out.println(request);
            Object data = service.register(request);
            return Respond.success(200,"I002",data);
       }
       catch (Exception e) {
           return Respond.fail(500,"E101",e.getStackTrace());
       }
    }
    @PostMapping("/authenticate")
    public ResponseEntity<Object> authenticate(
            @RequestBody AccountDTO request
    ) {
        return service.authenticate(request);
    }
    @PostMapping("/google")
    public ResponseEntity<Object> LoginWithGoogleOauth2(
            @RequestParam String google_token) {
        return service.loginOAuthGoogle(google_token);
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
        HttpServletRequest request,
        HttpServletResponse response
    ) throws IOException {
        service.refreshToken(request, response);
    }


}
