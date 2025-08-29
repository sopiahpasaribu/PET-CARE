// src/main/java/com/petcare/backend/config/DataInitializer.java
package com.petcare.backend.config;

import com.petcare.backend.model.Admin;
import com.petcare.backend.model.ServiceEntity;
import com.petcare.backend.repository.AdminRepository;
import com.petcare.backend.repository.ServiceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;

@Configuration
public class DataInitializer implements CommandLineRunner {

    private final AdminRepository adminRepo;
    private final ServiceRepository serviceRepo;
    private final PasswordEncoder encoder;

    public DataInitializer(AdminRepository adminRepo, ServiceRepository serviceRepo, PasswordEncoder encoder) {
        this.adminRepo = adminRepo;
        this.serviceRepo = serviceRepo;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) {
        Admin admin = createDefaultAdmin();
        createDefaultServices(admin); // ← kirim admin ke sini
    }

    private Admin createDefaultAdmin() {
        Admin admin = adminRepo.findByEmail("admin@petcare.com");
        if (admin == null) {
            admin = new Admin();
            admin.setName("Super Admin");
            admin.setEmail("admin@petcare.com");
            admin.setPassword(encoder.encode("admin123"));
            admin.setPhone("08123456789");
            admin = adminRepo.save(admin); // pastikan tersimpan & punya ID
            System.out.println("Admin default created successfully");
        }
        return admin;
    }

    private void createDefaultServices(Admin admin) {
        if (serviceRepo.count() == 0) {
            ServiceEntity grooming = new ServiceEntity();
            grooming.setName("Grooming Lengkap");
            grooming.setDescription("Grooming lengkap termasuk mandi, potong bulu, dan perawatan kuku");
            grooming.setBasePrice(new BigDecimal("150000"));
            grooming.setEstimatedDuration(120);
            grooming.setType(ServiceEntity.ServiceType.GROOMING);
            grooming.setAdmin(admin); // ← WAJIB

            ServiceEntity vaksinasi = new ServiceEntity();
            vaksinasi.setName("Vaksinasi");
            vaksinasi.setDescription("Vaksinasi dilakukan untuk mencegah hewan kamu terserang virus berbahaya");
            vaksinasi.setBasePrice(new BigDecimal("200000"));
            vaksinasi.setEstimatedDuration(30);
            vaksinasi.setType(ServiceEntity.ServiceType.VAKSINASI);
            vaksinasi.setAdmin(admin); // ← WAJIB

            ServiceEntity sterilisasi = new ServiceEntity();
            sterilisasi.setName("Sterilisasi");
            sterilisasi.setDescription("Sterilisasi hewan peliharaan untuk mencegah reproduksi dan menjaga kesehatan.");
            sterilisasi.setBasePrice(new BigDecimal("500000"));
            sterilisasi.setEstimatedDuration(120);
            sterilisasi.setType(ServiceEntity.ServiceType.STERILISASI);
            sterilisasi.setAdmin(admin); // ← WAJIB

            ServiceEntity pemeriksaan = new ServiceEntity();
            pemeriksaan.setName("Pemeriksaan Laboratorium");
            pemeriksaan.setDescription("Pemeriksaan untuk mengetahui kondisi kesehatan hewan");
            pemeriksaan.setBasePrice(new BigDecimal("500000"));
            pemeriksaan.setEstimatedDuration(60);
            pemeriksaan.setType(ServiceEntity.ServiceType.PEMERIKSAAN);
            pemeriksaan.setAdmin(admin); // ← WAJIB

            serviceRepo.save(grooming);
            serviceRepo.save(vaksinasi);
            serviceRepo.save(sterilisasi);
            serviceRepo.save(pemeriksaan);

            System.out.println("Default services created successfully");
        }
    }
}
