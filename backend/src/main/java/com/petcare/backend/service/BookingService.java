package com.petcare.backend.service;

import com.petcare.backend.dto.BookingRequestDTO;
import com.petcare.backend.model.Booking;
import com.petcare.backend.model.Pet;
import com.petcare.backend.model.ServiceEntity;
import com.petcare.backend.model.User;
import com.petcare.backend.repository.BookingRepository;
import com.petcare.backend.repository.PetRepository;
import com.petcare.backend.repository.ServiceRepository;
import com.petcare.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PetRepository petRepository;
    
    @Autowired
    private ServiceRepository serviceRepository;
    
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }
    
    public Booking createBooking(BookingRequestDTO bookingRequest) {
        User user = userRepository.findById(bookingRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Pet pet = petRepository.findById(bookingRequest.getPetId())
                .orElseThrow(() -> new RuntimeException("Pet not found"));
        ServiceEntity service = serviceRepository.findById(bookingRequest.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found"));
        
        LocalDate date = LocalDate.parse(bookingRequest.getBookingDate()); 
        LocalTime time = bookingRequest.getBookingTime() != null 
                ? bookingRequest.getBookingTime().toLocalTime() 
                : LocalTime.of(9, 0); 
        LocalDateTime finalBookingTime = LocalDateTime.of(date, time);
        
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setPet(pet);
        booking.setService(service);
        booking.setBookingTime(finalBookingTime);
        booking.setStatus("PENDING"); 
        
        return bookingRepository.save(booking);
    }
    
    public Booking updateBookingStatus(Long id, String status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }
    
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
    
    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    // 🔍 Search bookings
    public List<Booking> searchBookings(String keyword) {
        return bookingRepository
                .findByUser_NameContainingIgnoreCaseOrPet_NameContainingIgnoreCaseOrService_NameContainingIgnoreCase(
                        keyword, keyword, keyword);
    }

    // 📅 Sort bookings by bookingTime
    public List<Booking> sortBookingsByDate(String order) {
        if ("desc".equalsIgnoreCase(order)) {
            return bookingRepository.findAll(Sort.by(Sort.Direction.DESC, "bookingTime"));
        }
        return bookingRepository.findAll(Sort.by(Sort.Direction.ASC, "bookingTime"));
    }
}
