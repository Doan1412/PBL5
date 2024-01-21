package com.example.server.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class Respond {
    public static ResponseEntity<Object> success( int status, String msg, Object data) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", msg);
        map.put("status", status);
        map.put("data", data);

        return new ResponseEntity<Object>(map, HttpStatus.OK);
    }
    public static ResponseEntity<Object> fail(int status, String msg, Object err) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", msg);
        map.put("status", status);
        map.put("error", err);

        return new ResponseEntity<Object>(map, HttpStatus.OK);
    }
}
