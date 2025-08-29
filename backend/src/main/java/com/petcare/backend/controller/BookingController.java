package com.petcare.backend.controller;

import com.petcare.backend.dto.BookingRequestDTO;
import com.petcare.backend.model.Booking;
import com.petcare.backend.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // ✅ Ambil semua booking
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    // ✅ Ambil booking berdasarkan ID
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Optional<Booking> booking = bookingService.getBookingById(id);
        return booking.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Buat booking baru
    @PostMapping
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody BookingRequestDTO bookingRequest) {
        Booking createdBooking = bookingService.createBooking(bookingRequest);
        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
    }

    // ✅ Update status booking (misal: CONFIRMED, CANCELED)
    @PutMapping("/{id}/status")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long id, @RequestParam String status) {
        Booking updatedBooking = bookingService.updateBookingStatus(id, status);
        return ResponseEntity.ok(updatedBooking);
    }

    // ✅ Hapus booking
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ Ambil semua booking untuk user tertentu
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable Long userId) {
        List<Booking> userBookings = bookingService.getUserBookings(userId);
        return ResponseEntity.ok(userBookings);
    }

    // 🔍 Cari booking berdasarkan nama (user/pet/service)
    @GetMapping("/search")
    public ResponseEntity<List<Booking>> searchBookings(@RequestParam String keyword) {
        List<Booking> results = bookingService.searchBookings(keyword);
        return ResponseEntity.ok(results);
    }

    // 📅 Sort booking berdasarkan tanggal (asc/desc)
    @GetMapping("/sort")
    public ResponseEntity<List<Booking>> sortBookings(@RequestParam(defaultValue = "asc") String order) {
        List<Booking> sorted = bookingService.sortBookingsByDate(order);
        return ResponseEntity.ok(sorted);
    }
}
