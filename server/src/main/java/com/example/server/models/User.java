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
}
