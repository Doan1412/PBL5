package com.example.server.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import ch.qos.logback.classic.Logger;
import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;

import org.slf4j.LoggerFactory;

import java.io.DataInputStream;
import java.net.ServerSocket;
import java.net.Socket;

@Slf4j
@Service
public class SocketConfiguration {

  @Autowired
  @Value("${socket.server.port}")
  private int port;

  private ServerSocket server;

  @Bean
  public void server(){
    try {
      server = new ServerSocket(port);

      class SocketThread extends Thread {
        @Override
        public void run() {
          try {
            while(true) {
              Socket soc = server.accept();
              String user = new DataInputStream(soc.getInputStream()).readUTF();
              log.info("New client connected: " + soc.getLocalAddress() + " " + user);
              new SocketNotiHandle(soc, user).start();
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
  public void close() throws Exception{
    if (server != null) {
      server.close();
      log.info("Server socket closed");
    }
  }
}
