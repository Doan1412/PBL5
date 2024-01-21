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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Node("User")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class User implements UserDetails {
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
    @NotNull
    @NotBlank
    private String email;
    @NotNull
    @JsonIgnore
    @NotBlank
    private String password;
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
    @Relationship(type = "FRIEND", direction = Relationship.Direction.OUTGOING)
    private Set<User> friends;
    @Relationship(type = "FRIEND_REQUEST_SENT", direction = Relationship.Direction.OUTGOING)
    private Set<FriendRequest> friendRequestsSent = new HashSet<>();
    @Relationship(type = "FRIEND_REQUEST_RECEIVED", direction = Relationship.Direction.INCOMING)
    private Set<FriendRequest> friendRequestsReceived = new HashSet<>();
    @Relationship(type = "CONTAINS_ATTACHMENT", direction = Relationship.Direction.OUTGOING)
    private Set<PostAttachment> attachments = new HashSet<>();
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }
    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    public void addFriend(User friend) {
        this.friends.add(friend);
    }

    // Phương thức xóa bạn bè
    public void removeFriend(User friend) {
        this.friends.remove(friend);
    }

    public void sendFriendRequest(User friend, String status) {
        FriendRequest friendRequest = FriendRequest.builder()
                .createdAt(LocalDateTime.now())
                .receiver(friend)
                .status(status)
                .build();
        this.friendRequestsSent.add(friendRequest);
        friend.friendRequestsReceived.add(friendRequest);
    }

}
