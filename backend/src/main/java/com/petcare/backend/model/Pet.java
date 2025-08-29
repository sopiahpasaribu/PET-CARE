// src/main/java/com/petcare/backend/model/Pet.java
package com.petcare.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pets")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String species;
    private String breed;

    // Gunakan Double agar bisa menampung usia desimal
    private Double age;

    // Relasi ManyToOne ke User, wajib ada user, cegah infinite JSON loop
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    // Optional: constructor untuk frontend tanpa ID dan user
    public Pet(String name, String species, String breed, Double age) {
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.age = age;
      
    }
}
