package com.example.server.controllers;

import com.example.server.DTO.UserDTO;
import com.example.server.models.User;
import com.example.server.service.UserService;
import com.example.server.utils.Respond;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;
    @GetMapping("/{id}")
    public ResponseEntity<Object> getById(@PathVariable String id) {
        try {
            User user = service.getInfoById(id);
            return Respond.success(200,"I001",user);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getStackTrace());
        }
    }

    @GetMapping("")
    public ResponseEntity<Object> getAll(){
        try {
            List<User> data= service.getAll();
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getStackTrace());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Object> update( @RequestBody  UserDTO user) {
        try {
            System.out.println(user);
            User u = service.updateInfo(user);
            return Respond.success(200,"I001","");
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
        try {
            service.delete(id);
            return Respond.success(200,"I001","");
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getStackTrace());
        }
    }
}
