package com.example.server.service;

import java.io.IOException;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.example.server.DTO.LocationDTO;
import com.example.server.models.Entity.Post;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;

@Service
@RequiredArgsConstructor

public class AIService {
    private final RestTemplate restTemplate = new RestTemplate();
    @Value("${ai.uri}")
    private String uri; 
    
    public List<String> parseResponseToList(String responseBody) throws IOException {
        ObjectMapper mapper = new ObjectMapper();

        // Define the type of the target object (List<String>)
        TypeReference<List<String>> typeReference = new TypeReference<List<String>>() {};

        // Use ObjectMapper to parse JSON array into List<String>
        List<String> resultList = mapper.readValue(responseBody, typeReference);

        return resultList;
    }
    public List<String> searchPost(String type, String query, String id) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        // Tạo đối tượng HttpEntity chứa headers và payload
        if (type.equals("image")) {
            HttpEntity<String> requestEntity = new HttpEntity<>("{\"uri\": \""+query+"\", \"user_id\": \""+id+"\"}",headers);
            String apiUrl = uri+"/searchimage";
            ResponseEntity<String> responseEntity = restTemplate.exchange(
                apiUrl,
                HttpMethod.POST,
                requestEntity,
                String.class
            );
            HttpStatusCode statusCode = responseEntity.getStatusCode();
            if(statusCode != HttpStatusCode.valueOf(200)) {
                throw new RuntimeException("Failed : Can't call to AI");
            }// Change the data type to HttpStatusCode
            String responseBody = responseEntity.getBody();
            List<String> data = parseResponseToList(responseBody);
            return data;
        }
        else if (type.equals("text")) {
            HttpEntity<String> requestEntity = new HttpEntity<>("{\"text\": \""+query+"\", \"user_id\": \""+id+"\"}",headers);
            String apiUrl = uri+"/searchtext";
            ResponseEntity<String> responseEntity = restTemplate.exchange(
                apiUrl,
                HttpMethod.POST,
                requestEntity,
                String.class
            );
            HttpStatusCode statusCode = responseEntity.getStatusCode();
            if(statusCode != HttpStatusCode.valueOf(200)) {
                throw new RuntimeException("Failed : Can't call to AI");
            }// Change the data type to HttpStatusCode
            String responseBody = responseEntity.getBody();
            List<String> data = parseResponseToList(responseBody);
            return data;
        }
        return null;
    }

    public List<String> nearbyFidList(LocationDTO location) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<LocationDTO> requestEntity = new HttpEntity<>(location,headers);
        String apiUrl = uri+"/findfriendnearby";
        ResponseEntity<String> responseEntity = restTemplate.exchange(
            apiUrl,
            HttpMethod.POST,
            requestEntity,
            String.class
        );
        HttpStatusCode statusCode = responseEntity.getStatusCode();
        if(statusCode != HttpStatusCode.valueOf(200)) {
            throw new RuntimeException("Failed : Can't call to AI");
        }// Change the data type to HttpStatusCode
        String responseBody = responseEntity.getBody();
        List<String> data = parseResponseToList(responseBody);
        return data;
    }

    public List<String> find_friend(String user_id) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> requestEntity = new HttpEntity<>("{\"user_id\": \""+user_id+"\"}",headers);
        String apiUrl = uri+"/findfriend";
        ResponseEntity<String> responseEntity = restTemplate.exchange(
            apiUrl,
            HttpMethod.POST,
            requestEntity,
            String.class
        );
        HttpStatusCode statusCode = responseEntity.getStatusCode();
        if(statusCode != HttpStatusCode.valueOf(200)) {
            throw new RuntimeException("Failed : Can't call to AI");
        }// Change the data type to HttpStatusCode
        String responseBody = responseEntity.getBody();
        List<String> data = parseResponseToList(responseBody);
        return data;
    }
    public List<String> suggestPost(String user_id) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> requestEntity = new HttpEntity<>("{\"user_id\": \""+user_id+"\"}",headers);
        String apiUrl = uri+"/post/suggest";
        ResponseEntity<String> responseEntity = restTemplate.exchange(
            apiUrl,
            HttpMethod.POST,
            requestEntity,
            String.class
        );
        HttpStatusCode statusCode = responseEntity.getStatusCode();
        if(statusCode != HttpStatusCode.valueOf(200)) {
            throw new RuntimeException("Failed : Can't call to AI");
        }// Change the data type to HttpStatusCode
        String responseBody = responseEntity.getBody();
        List<String> data = parseResponseToList(responseBody);
        return data;
    }
    public List<String> find_user(String user_id, String query) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> requestEntity = new HttpEntity<>("{\"user_id\": \""+user_id+"\", \"text\": \""+query+"\"}",headers);
        String apiUrl = uri+"/searchuser";
        ResponseEntity<String> responseEntity = restTemplate.exchange(
            apiUrl,
            HttpMethod.POST,
            requestEntity,
            String.class
        );
        HttpStatusCode statusCode = responseEntity.getStatusCode();
        if(statusCode != HttpStatusCode.valueOf(200)) {
            throw new RuntimeException("Failed : Can't call to AI");
        }// Change the data type to HttpStatusCode
        String responseBody = responseEntity.getBody();
        List<String> data = parseResponseToList(responseBody);
        return data;
    }
    public Boolean checknsfw(Post savedPost) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Post> requestEntity = new HttpEntity<>(savedPost);
        String apiUrl = uri+"/checknsfw";
        ResponseEntity<String> responseEntity = restTemplate.exchange(
            apiUrl,
            HttpMethod.POST,
            requestEntity,
            String.class
        );
        HttpStatusCode statusCode = responseEntity.getStatusCode();
        if(statusCode != HttpStatusCode.valueOf(200)) {
            throw new RuntimeException("Failed : Can't call to AI");
        }// Change the data type to HttpStatusCode
        String responseBody = responseEntity.getBody();
        if (responseBody.equals("1")) {
            return true;
        }
        return false;
    }
    
}
