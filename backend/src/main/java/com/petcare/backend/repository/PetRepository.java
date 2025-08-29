package com.petcare.backend.repository;

import com.petcare.backend.model.Pet;
import com.petcare.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByUser(User user); 
}
