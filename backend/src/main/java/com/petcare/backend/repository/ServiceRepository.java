// src/main/java/com/petcare/backend/repository/ServiceRepository.java
package com.petcare.backend.repository;

import com.petcare.backend.model.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
    List<ServiceEntity> findByType(ServiceEntity.ServiceType type);
}