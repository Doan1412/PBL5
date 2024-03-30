package com.example.server.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;


import java.util.Date;
@Data
public class RegisterRequest {
    private String firstname;

    private String lastname;

    private String username;

    private String email;
    private String password;
    @JsonFormat(pattern="yyyy-MM-dd",timezone="Indochina")
    private Date birth;

    private String gender; //gioi tinh

    private String phone;
}
