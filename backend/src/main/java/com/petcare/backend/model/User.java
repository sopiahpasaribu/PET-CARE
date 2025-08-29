// src/main/java/com/petcare/backend/model/User.java
package com.petcare.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name="users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class User {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  private String name;
  @Column(unique=true, nullable=false) private String email;
  private String password;
  private String phone;
}
