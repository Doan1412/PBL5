package com.example.server.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    @NotBlank
    private String id;
    @NotBlank
    private String firstname;
    @NotBlank
    private String lastname;
    @NotBlank
    private String username;
    @JsonFormat(pattern="yyyy-MM-dd",timezone="Indochina")
    @NotBlank
    private Date birth;
    @NotBlank
    private String gender; //gioi tinh
    @NotBlank
    private String phone;
}
