// src/main/java/com/petcare/backend/model/ServiceEntity.java
package com.petcare.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore; // ← tambahin import ini
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    // harga dasar
    @Column(nullable = false)
    private BigDecimal basePrice;

    // estimasi durasi layanan dalam menit
    @Column(nullable = false)
    private Integer estimatedDuration;

    // tipe layanan pakai enum
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceType type;

    // Relasi ke Admin (banyak service bisa dimiliki 1 admin)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id", nullable = false)
    @JsonIgnore   // ⬅⬅ fix di sini supaya tidak looping
    private Admin admin;

    public enum ServiceType {
        GROOMING,
        VAKSINASI,
        STERILISASI,
        PEMERIKSAAN
    }
}
