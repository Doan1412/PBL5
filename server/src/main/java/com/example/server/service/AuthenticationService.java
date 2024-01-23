package com.example.server.service;

import com.example.server.DTO.AccountDTO;
import com.example.server.DTO.RegisterRequest;
import com.example.server.configuration.JwtService;
import com.example.server.models.Account;
import com.example.server.models.Profile;
import com.example.server.models.Token;
import com.example.server.models.User;
import com.example.server.repositories.AccountRepository;
import com.example.server.repositories.ProfileRepository;
import com.example.server.repositories.TokenRepository;
import com.example.server.repositories.UserRepository;
import com.example.server.utils.PasswordUtil;
import com.example.server.utils.Respond;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AccountRepository repository;
    private final UserRepository userRepository;

    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final ProfileRepository profileRepository;

    public Object register(RegisterRequest request) {
        var account = Account.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        var profile = Profile.builder()
                .avatar_url("")
                .bio("")
                .cover_url("")
                .build();
        var savedProfile = profileRepository.save(profile);
        var user = User.builder()
                .birth(request.getBirth())
                .account(account)
                .phone(request.getPhone())
                .gender(request.getGender())
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .username(request.getUsername())
                .profile(savedProfile)
                .build();
        var savedUser = userRepository.save(user);
        var savedAccount = repository.save(account);
//        System.out.println(savedUser);
        var jwtToken = jwtService.generateToken(savedAccount);
        var refreshToken = jwtService.generateRefreshToken(savedAccount);
        saveUserToken(savedAccount, jwtToken);
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("access_token",jwtToken);
        data.put("refresh_token",refreshToken);
        data.put("user_id",savedUser.getId());
        return data;
    }

    public ResponseEntity<Object> authenticate(AccountDTO request) {
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        request.getEmail(),
//                        request.getPassword()
//                )
//        );
        var acc = repository.findByEmail(request.getEmail())
                .orElseThrow();
        System.out.println(acc);
        System.out.println(passwordEncoder.encode(request.getPassword()));
        if(passwordEncoder.matches(request.getPassword(), acc.getPassword())){
            var jwtToken = jwtService.generateToken(acc);
            var refreshToken = jwtService.generateRefreshToken(acc);
            revokeAllUserTokens(acc);
            saveUserToken(acc, jwtToken);
            Map<String, Object> data = new HashMap<String, Object>();
            data.put("access_token",jwtToken);
            data.put("refresh_token",refreshToken);
            String user_id = repository.findUserIdByAccountId(acc.getId());
            data.put("user_id",user_id);
            return Respond.success(200,"I001",data);
        }
        else {
            return Respond.fail(400,"E001","Wrong password");
        }

    }

    private void saveUserToken(Account account, String jwtToken) {
        var token = Token.builder()
                .account(account)
                .token(jwtToken)
                .tokenType("Bear")
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(Account user) {
        tokenRepository.deleteByAccountId(user.getId());
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
            var acc = this.repository.findByEmail(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, acc)) {
                var accessToken = jwtService.generateToken(acc);
                revokeAllUserTokens(acc);
                saveUserToken(acc, accessToken);
                Map<String, Object> data = new HashMap<String, Object>();
                data.put("access_token",accessToken);
                data.put("refresh_token",refreshToken);
                new ObjectMapper().writeValue(response.getOutputStream(), Respond.success(200,"I002",data));
            }
        }
    }
}
