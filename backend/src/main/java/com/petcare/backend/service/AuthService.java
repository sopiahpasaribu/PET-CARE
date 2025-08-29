package com.petcare.backend.service;

import com.petcare.backend.dto.RegisterDto;
import com.petcare.backend.model.Admin;
import com.petcare.backend.model.User;
import com.petcare.backend.repository.AdminRepository;
import com.petcare.backend.repository.UserRepository;
import com.petcare.backend.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final AdminRepository adminRepo;
    private final PasswordEncoder encoder;
    private final JwtTokenProvider jwt;

    public AuthService(UserRepository userRepo, AdminRepository adminRepo,
                       PasswordEncoder encoder, JwtTokenProvider jwt) {
        this.userRepo = userRepo;
        this.adminRepo = adminRepo;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    // =======================
    // Register user baru
    // =======================
    public void register(RegisterDto dto) {
        if (userRepo.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already used");
        }
        User u = new User();
        u.setName(dto.getName());
        u.setEmail(dto.getEmail());
        u.setPhone(dto.getPhone());
        u.setPassword(encoder.encode(dto.getPassword()));
        userRepo.save(u);
    }

    // =======================
    // Login user/admin
    // =======================
    public String login(String email, String rawPassword) {
        // cek admin dulu
        Admin admin = adminRepo.findByEmail(email);
        if (admin != null && encoder.matches(rawPassword, admin.getPassword())) {
            return jwt.generateToken(email, "ADMIN");
        }

        // cek user
        User user = userRepo.findByEmail(email).orElse(null); // ✅ fix Optional
        if (user != null && encoder.matches(rawPassword, user.getPassword())) {
            return jwt.generateToken(email, "USER");
        }

        throw new RuntimeException("Invalid credentials");
    }
}
