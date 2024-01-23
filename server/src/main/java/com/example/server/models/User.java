package com.example.server.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;
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
    @NotNull
    @NotBlank
    private String firstname;
    @NotNull
    @NotBlank
    private String lastname;
    @NotNull
    @NotBlank
    private String username;
    @JsonFormat(pattern="yyyy-MM-dd",timezone="Indochina")
    @NotNull
    @NotBlank
    private Date birth;
    @NotNull
    @NotBlank
    private String gender; //gioi tinh
    @NotNull
    @NotBlank
    private String phone;
    @Relationship(type = "HAS_PROFILE", direction = Relationship.Direction.OUTGOING)
    private Profile profile;
    @Relationship(type = "HAS_ACCOUNT", direction = Relationship.Direction.OUTGOING)
    private Account account;
    @Relationship(type = "FRIEND", direction = Relationship.Direction.OUTGOING)
    private Set<User> friends;
    @Relationship(type = "POSTED_BY", direction = Relationship.Direction.OUTGOING)
    private Set<Post> posts = new HashSet<>();

    public void addFriend(User friend) {
        this.friends.add(friend);
    }

    // Phương thức xóa bạn bè
    public void removeFriend(User friend) {
        this.friends.remove(friend);
    }


}
