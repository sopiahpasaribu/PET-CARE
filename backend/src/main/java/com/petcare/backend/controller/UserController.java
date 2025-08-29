package com.petcare.backend.controller;

import com.petcare.backend.model.*;
import com.petcare.backend.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepo;
    private final PetRepository petRepo;
    private final BookingRepository bookingRepo;
    private final ServiceRepository serviceRepo;

    public UserController(UserRepository userRepo, PetRepository petRepo,
                          BookingRepository bookingRepo, ServiceRepository serviceRepo) {
        this.userRepo = userRepo;
        this.petRepo = petRepo;
        this.bookingRepo = bookingRepo;
        this.serviceRepo = serviceRepo;
    }

    // ===========================
    // Helper: ambil user dari email (subject token)
    // ===========================
    private User me(Principal principal) {
        return userRepo.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // ===========================
    // Ambil semua hewan milik user
    // ===========================
    @GetMapping("/pets")
    public List<Pet> myPets(Principal p) {
        return petRepo.findByUser(me(p));
    }

    // ===========================
    // Tambah hewan peliharaan
    // ===========================
    @PostMapping("/pets")
    public ResponseEntity<?> addPet(@RequestBody Pet pet, Principal p) {
        pet.setUser(me(p));
        Pet savedPet = petRepo.save(pet);
        return ResponseEntity.ok(savedPet);
    }

    // ===========================
    // Ambil semua booking milik user
    // ===========================
    @GetMapping("/bookings")
    public List<Booking> myBookings(Principal p) {
        User user = me(p);
        return bookingRepo.findByUserId(user.getId());
    }

    // ===========================
    // Booking layanan
    // ===========================
    @PostMapping("/bookings")
    public ResponseEntity<?> book(@RequestParam Long petId,
                                  @RequestParam Long serviceId,
                                  Principal p) {

        User u = me(p);
        Pet pet = petRepo.findById(petId)
                .orElseThrow(() -> new RuntimeException("Pet not found"));
        ServiceEntity s = serviceRepo.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        // Pastikan pet milik user yang login
        if (!pet.getUser().getId().equals(u.getId())) {
            return ResponseEntity.badRequest().body("Pet tidak dimiliki oleh user");
        }

        Booking b = new Booking();
        b.setBookingTime(LocalDateTime.now());
        b.setStatus("PENDING");
        b.setUser(u);
        b.setPet(pet);
        b.setService(s);

        Booking savedBooking = bookingRepo.save(b);
        return ResponseEntity.ok(savedBooking);
    }

    // ===========================
    // Update user profile (hanya name & phone)
    // ===========================
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User updatedUser, Principal p) {
        User user = me(p);
        user.setName(updatedUser.getName());
        user.setPhone(updatedUser.getPhone());
        User saved = userRepo.save(user);
        return ResponseEntity.ok(saved);
    }

    // ===========================
    // Hapus akun user
    // ===========================
    @DeleteMapping
    public ResponseEntity<?> deleteAccount(Principal p) {
        User user = me(p);
        userRepo.delete(user);
        return ResponseEntity.ok("User account deleted");
    }
}
