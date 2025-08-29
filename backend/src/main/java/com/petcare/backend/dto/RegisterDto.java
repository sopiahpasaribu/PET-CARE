package com.petcare.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterDto {
  @NotBlank @Size(min=3,max=50) private String name;
  @NotBlank @Email private String email;
  @NotBlank private String phone;
  @NotBlank @Size(min=6,max=40) private String password;
}
