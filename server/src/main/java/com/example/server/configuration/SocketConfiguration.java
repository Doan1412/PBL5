package com.example.server.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.example.server.repositories.TokenRepository;
import com.example.server.repositories.UserRepository;

import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.DataInputStream;
import java.net.ServerSocket;
import java.net.Socket;
@RequiredArgsConstructor
@Slf4j
@Service
public class SocketConfiguration {

  @Autowired
  @Value("${socket.server.port}")
  private int port;

  private ServerSocket server;
  private JwtService jwtService;
  private final UserDetailsService userDetailsService;
  private final TokenRepository tokenRepository;
  private final UserRepository userRepository;
  @Bean
  public void server() {
    try {
      server = new ServerSocket(port);

      class SocketThread extends Thread {
        @Override
        public void run() {
          try {
            while (true) {
              Socket soc = server.accept();
              soc.setSoTimeout(100); // Set timeout to 100ms
              try {
                String token = new DataInputStream(soc.getInputStream()).readUTF();
                if (token != null && !token.isEmpty()) { // Check token here
                  String userEmail = jwtService.extractUsername(token);
                  if (userEmail != null ) {
                    System.out.println(userEmail);
                    UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
                    var isTokenValid = tokenRepository.findByToken(token)
                        .map(t -> !t.isExpired() && !t.isRevoked())
                        .orElse(false);
                    if (jwtService.isTokenValid(token, userDetails) && isTokenValid) {
                      String userId = userRepository.getUserIdByEmail(userEmail);
                      log.info("New client connected: " + soc.getLocalAddress() + " " + userId);
                      new SocketNotiHandle(soc, userId).start();
                    }
                  } 
                } else {
                  log.warn("Invalid token. Closing connection...");
                  soc.close(); // Close the connection if token is not received within 100ms
                }
              } catch (Exception e) {
                // Handle exception here
                log.error("Error reading user id: " + e.getMessage());
                soc.close(); // Close the connection if user id is not received within 100ms
              }
            }
          } catch (Exception e) {
            // Handle exception here
          }
        }
      }
      SocketThread socketThread = new SocketThread();
      socketThread.start();
    } catch (Exception e) {
      // Handle exception here
    }
  }

  @PreDestroy
  public void close() throws Exception {
    if (server != null) {
      server.close();
      log.info("Server socket closed");
    }
  }
}
