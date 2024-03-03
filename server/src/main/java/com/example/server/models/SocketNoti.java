package com.example.server.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SocketNoti {

  @JsonProperty("payload")
  private String payload;

  @JsonProperty("group")
  private String group;
}
