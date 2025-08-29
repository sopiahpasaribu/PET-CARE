// src/main/java/com/petcare/backend/model/Booking.java
package com.petcare.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name="bookings")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Booking {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  private LocalDateTime bookingTime;
  private String status;
  private Double bayar;

  @ManyToOne @JoinColumn(name="user_id") private User user;
  @ManyToOne @JoinColumn(name="pet_id") private Pet pet;
  @ManyToOne @JoinColumn(name="service_id") private ServiceEntity service;
}
