// src/main/java/com/petcare/backend/controller/AuthController.java
package com.petcare.backend.controller;

import com.petcare.backend.dto.JwtResponse;
import com.petcare.backend.dto.LoginDto;
import com.petcare.backend.dto.RegisterDto;
import com.petcare.backend.model.User;
import com.petcare.backend.model.Admin;
import com.petcare.backend.repository.UserRepository;
import com.petcare.backend.repository.AdminRepository;
import com.petcare.backend.security.JwtTokenProvider;
import com.petcare.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthService authService;
  private final JwtTokenProvider jwt;
  private final UserRepository userRepository;
  private final AdminRepository adminRepository;

  public AuthController(AuthService authService, JwtTokenProvider jwt,
                        UserRepository userRepository, AdminRepository adminRepository) {
    this.authService = authService;
    this.jwt = jwt;
    this.userRepository = userRepository;
    this.adminRepository = adminRepository;
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@Valid @RequestBody RegisterDto dto) {
    authService.register(dto);
    return ResponseEntity.ok().body("Registered. Please login.");
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@Valid @RequestBody LoginDto dto) {
    String token = authService.login(dto.getEmail(), dto.getPassword());
    String role = jwt.parse(token).getBody().get("role", String.class);

    String name;
    String email;
    String phone;

    if ("USER".equals(role)) {
      User user = userRepository.findByEmail(dto.getEmail())
          .orElseThrow(() -> new RuntimeException("User not found"));
      name = user.getName();
      email = user.getEmail();
      phone = user.getPhone();
    } else if ("ADMIN".equals(role)) {
      Admin admin = adminRepository.findByEmail(dto.getEmail());
      if (admin == null) throw new RuntimeException("Admin not found");
      name = admin.getName();
      email = admin.getEmail();
      phone = admin.getPhone();
    } else {
      throw new RuntimeException("Unknown role");
    }

    return ResponseEntity.ok(
        new JwtResponse(token, "Bearer", role, name, email, phone)
    );
  }
}
