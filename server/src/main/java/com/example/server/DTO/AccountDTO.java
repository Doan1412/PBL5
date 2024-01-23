package com.example.server.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
    public String getUsername(){
        return this.email;
    }
}
