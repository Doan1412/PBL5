package com.example.server.DTO;

import com.example.server.models.Entity.User;

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
    public void loadFromEntity(User user) {
        this.id = user.getId();
        this.fullname = user.getFirstname() + " " + user.getLastname();
        this.avatar_url = user.getProfile().getAvatar_url();
        this.username = user.getUsername();
    }
}
