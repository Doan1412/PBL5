package com.example.server.service;

import com.example.server.DTO.AccountDTO;
import com.example.server.DTO.RegisterRequest;
import com.example.server.configuration.JwtService;
import com.example.server.models.Entity.Account;
import com.example.server.models.Entity.Profile;
import com.example.server.models.Entity.Token;
import com.example.server.models.Entity.User;
import com.example.server.models.Enum.AccountStatus;
import com.example.server.models.Enum.Role;
import com.example.server.repositories.AccountRepository;
import com.example.server.repositories.ProfileRepository;
import com.example.server.repositories.TokenRepository;
import com.example.server.repositories.UserRepository;
import com.example.server.utils.Respond;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.json.simple.JSONObject;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email đã tồn tại trong hệ thống");
        }
        var account = Account.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(String.valueOf(Role.USER))
                .status(AccountStatus.ACTIVE.toString())
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
            return createAuthRes(acc);
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
    private void updateUserToken(Account account, String jwtToken) {
        Token token = tokenRepository.findByAccount(account).orElse(null);
        token.setToken(jwtToken);
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(Account user) {
        tokenRepository.deleteByAccountId(user.getId());
    }

    public ResponseEntity<Object> refreshToken( String authHeader ) throws IOException {
        final String refreshToken;
        final String userEmail;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Token not found");
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        System.out.println(userEmail);
        if (userEmail != null) {
            Account acc = this.repository.findByEmail(userEmail)
            .orElseThrow();
            System.out.println(acc.getId());
            if (jwtService.isTokenValid(refreshToken, acc)) {
                var accessToken = jwtService.generateToken(acc);
                revokeAllUserTokens(acc);
                updateUserToken(acc, accessToken);
                Map<String, Object> data = new HashMap<String, Object>();
                data.put("access_token",accessToken);
                data.put("refresh_token",refreshToken);
                return Respond.success(200,"I002",data);
            }
        }
        return Respond.fail(400,"E001","Token invalid");
    }

    public ResponseEntity<Object> loginOAuthGoogle(String googleToken) {
        try{
        RestTemplate restTemplate= new RestTemplate();
        JSONObject jsonObject = restTemplate
                .exchange(
                        "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + googleToken,
                        HttpMethod.GET,
                        null,
                        JSONObject.class)
                .getBody();
        String email = null;
        if (jsonObject != null) {
            email = jsonObject.get("email").toString();
        }
        if (email != null) {
            Optional<Account> accountOptional = repository.findByEmail(email);
            if (accountOptional.isPresent()) {
                return createAuthRes(accountOptional.get());
            } else {
                var account = Account.builder()
                        .email(email)
                        .build();
                var profile = Profile.builder()
                        .avatar_url(jsonObject.get("picture") != null
                                ? jsonObject.get("picture").toString()
                                : "")
                        .bio("")
                        .cover_url("")
                        .build();
                var savedProfile = profileRepository.save(profile);
                var user = User.builder()
                        .birth(null)
                        .account(account)
                        .phone(jsonObject.get("phoneNumber") != null
                                ? jsonObject.get("phoneNumber").toString()
                                : "")
                        .gender(jsonObject.get("gender") != null
                                ? jsonObject.get("gender").toString()
                                : "")
                        .firstname(jsonObject.get("given_name") != null
                                ? jsonObject.get("given_name").toString()
                                : "")
                        .lastname(jsonObject.get("family_name") != null
                                ? jsonObject.get("family_name").toString()
                                : "")
                        .username(String.format("%s_%s", jsonObject.get("given_name"), jsonObject.get("family_name")))
                        .profile(savedProfile)
                        .build();
                var savedUser = userRepository.save(user);
                var savedAccount = repository.save(account);
                return createAuthRes(savedAccount);
            }
        } else {
            // Handle case when email is null
            return Respond.fail(400,"E001","Email null");
        }}
        catch (Exception e) {
            return Respond.fail(400,"E001",e.getStackTrace());
        }
    }

    private ResponseEntity<Object> createAuthRes(Account acc) {
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
}
