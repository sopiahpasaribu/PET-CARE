package com.petcare.backend.repository;

import com.petcare.backend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    // langsung mengembalikan Admin, null jika tidak ditemukan
    Admin findByEmail(String email);
}
