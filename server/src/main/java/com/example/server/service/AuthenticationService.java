package com.example.server.service;

import com.example.server.DTO.Account;
import com.example.server.DTO.RegisterRequest;
import com.example.server.configuration.JwtService;
import com.example.server.models.Profile;
import com.example.server.models.Token;
import com.example.server.models.User;
import com.example.server.repositories.TokenRepository;
import com.example.server.repositories.UserRepository;
import com.example.server.utils.PasswordUtil;
import com.example.server.utils.Respond;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public Object register(RegisterRequest request) {
        var user = User.builder()
                .birth(request.getBirth())
                .email(request.getEmail())
                .phone(request.getPhone())
                .gender(request.getGender())
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .username(request.getUsername())
                .password(request.getPassword())
                .build();
        System.out.println(user);
        var savedUser = repository.save(user);
//        System.out.println(savedUser);
        var jwtToken = jwtService.generateToken(savedUser);
        var refreshToken = jwtService.generateRefreshToken(savedUser);
        saveUserToken(savedUser, jwtToken);
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("access_token",jwtToken);
        data.put("refresh_token",refreshToken);
        data.put("user_id",savedUser.getId());
        return data;
    }

    public ResponseEntity<Object> authenticate(Account request) {
        System.out.println(request);
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        System.out.println(request.getEmail());
        if(PasswordUtil.verify(user.getPassword(),PasswordUtil.encode(request.getPassword()))){
            var jwtToken = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(user);
            revokeAllUserTokens(user);
            saveUserToken(user, jwtToken);
            Map<String, Object> data = new HashMap<String, Object>();
            data.put("access_token",jwtToken);
            data.put("refresh_token",refreshToken);
            data.put("user_id",user.getId());
            return Respond.success(200,"I001",data);
        }
        else {
            return Respond.fail(400,"E001","Wrong password");
        }

    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType("Bear")
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        tokenRepository.deleteByUserId(user.getId());
    }

    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        System.out.println(userEmail);
        if (userEmail != null) {
            var user = this.repository.findByUsername(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                Map<String, Object> data = new HashMap<String, Object>();
                data.put("access_token",accessToken);
                data.put("refresh_token",refreshToken);
                new ObjectMapper().writeValue(response.getOutputStream(), Respond.success(200,"I002",data));
            }
        }
    }
}
