package com.example.server.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DisplayUserDTO {
    private String id;
    private String fullname;
    private String avatar_url;
    private String username;
}
