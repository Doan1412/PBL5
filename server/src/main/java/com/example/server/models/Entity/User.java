package com.example.server.models.Entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

import java.util.*;

@Node("User")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(UUIDStringGenerator.class)
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
    @Relationship(type = "HAS_PROFILE", direction = Relationship.Direction.OUTGOING)
    private Profile profile;
    @Relationship(type = "HAS_ACCOUNT", direction = Relationship.Direction.OUTGOING)
    @JsonIgnore
    private Account account;

    @Relationship(type = "FRIEND", direction = Relationship.Direction.OUTGOING)
    @JsonIgnore
    private Set<User> friends;

    public void addFriend(User friend) {
        this.friends.add(friend);
    }

    // Phương thức xóa bạn bè
    public void removeFriend(User friend) {
        this.friends.remove(friend);
    }


}
