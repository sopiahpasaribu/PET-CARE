package com.petcare.backend.controller;

import com.petcare.backend.model.Pet;
import com.petcare.backend.model.User;
import com.petcare.backend.repository.PetRepository;
import com.petcare.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    private final PetRepository petRepository;
    private final UserRepository userRepository;

    public PetController(PetRepository petRepository, UserRepository userRepository) {
        this.petRepository = petRepository;
        this.userRepository = userRepository;
    }

    // ====== CREATE ======
    @PostMapping
    public ResponseEntity<Pet> buatPet(@RequestBody Pet data) {
        data.setId(null);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        data.setUser(currentUser);

        Pet saved = petRepository.save(data);
        return ResponseEntity.created(URI.create("/api/pets/" + saved.getId())).body(saved);
    }

    // ====== READ: semua pet milik user login ======
    @GetMapping("/me")
    public List<Pet> petSaya() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        return petRepository.findByUser(currentUser);
    }

    // ====== READ: detail pet by id ======
    @GetMapping("/{id}")
    public ResponseEntity<Pet> detailPet(@PathVariable Long id) {
        Optional<Pet> pet = petRepository.findById(id);
        if (pet.isPresent()) {
            return ResponseEntity.ok(pet.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ====== UPDATE ======
    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable Long id, @RequestBody Pet data) {
        Optional<Pet> existingPet = petRepository.findById(id);
        if (existingPet.isPresent()) {
            Pet existing = existingPet.get();
            existing.setName(data.getName());
            existing.setSpecies(data.getSpecies());
            existing.setBreed(data.getBreed());
            existing.setAge(data.getAge());

            Pet saved = petRepository.save(existing);
            return ResponseEntity.ok(saved);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ====== DELETE ======
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> hapusPet(@PathVariable Long id) {
        if (petRepository.existsById(id)) {
            petRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}