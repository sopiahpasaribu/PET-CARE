// src/main/java/com/petcare/backend/dto/JwtResponse.java
package com.petcare.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
  private String accessToken;
  private String tokenType;
  private String role;
  private String name;
  private String email;
  private String phone;
}
