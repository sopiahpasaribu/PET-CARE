// src/main/java/com/petcare/backend/dto/BookingRequestDTO.java
package com.petcare.backend.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDTO {
    private Long userId;
    private Long petId;
    private Long serviceId;
    private String bookingDate;
    private LocalDateTime bookingTime;
    private Double bayar;
}