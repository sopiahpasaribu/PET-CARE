// src/main/java/com/petcare/backend/controller/ServiceController.java
package com.petcare.backend.controller;

import com.petcare.backend.model.ServiceEntity;
import com.petcare.backend.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {
    
    @Autowired
    private ServiceRepository serviceRepository;
    
    @GetMapping
    public List<ServiceEntity> getAllServices() {
        return serviceRepository.findAll();
    }
    
    @GetMapping("/type/{type}")
    public List<ServiceEntity> getServicesByType(@PathVariable ServiceEntity.ServiceType type) {
        return serviceRepository.findByType(type);
    }
}