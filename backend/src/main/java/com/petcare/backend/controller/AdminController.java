package com.petcare.backend.controller;

import com.petcare.backend.model.Admin;
import com.petcare.backend.model.Booking;
import com.petcare.backend.model.ServiceEntity;
import com.petcare.backend.repository.AdminRepository;
import com.petcare.backend.repository.BookingRepository;
import com.petcare.backend.repository.ServiceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final BookingRepository bookingRepo;
    private final ServiceRepository serviceRepo;
    private final AdminRepository adminRepo;

    public AdminController(BookingRepository bookingRepo, ServiceRepository serviceRepo, AdminRepository adminRepo) {
        this.bookingRepo = bookingRepo;
        this.serviceRepo = serviceRepo;
        this.adminRepo = adminRepo;
    }

    // ===========================
    // Ambil semua booking
    // ===========================
    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    // ===========================
    // Tambah layanan baru oleh admin yang login
    // ===========================
    @PostMapping("/services")
    public ResponseEntity<?> addService(
            @RequestBody ServiceEntity service,
            @AuthenticationPrincipal UserDetails userDetails) {

        String email = userDetails.getUsername(); // ambil email dari token
        Admin admin = adminRepo.findByEmail(email);
        if (admin == null) return ResponseEntity.badRequest().body("Admin not found");

        service.setAdmin(admin);        // set admin pemilik layanan
        serviceRepo.save(service);      // simpan ke DB
        return ResponseEntity.ok("Service added by " + admin.getName());
    }

    // ===========================
    // Ambil semua layanan milik admin yang login
    // ===========================
    @GetMapping("/services")
    public ResponseEntity<?> getMyServices(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        Admin admin = adminRepo.findByEmail(email);
        if (admin == null) return ResponseEntity.badRequest().body("Admin not found");

        return ResponseEntity.ok(admin.getServices());
    }
}
