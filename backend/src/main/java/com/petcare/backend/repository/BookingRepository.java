package com.petcare.backend.repository;

import com.petcare.backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByPetId(Long petId);
    List<Booking> findByServiceId(Long serviceId);

    // 🔍 Search berdasarkan nama user, pet, atau service
    List<Booking> findByUser_NameContainingIgnoreCaseOrPet_NameContainingIgnoreCaseOrService_NameContainingIgnoreCase(
            String userName, String petName, String serviceName
    );
}
