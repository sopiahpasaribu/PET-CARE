// src/main/java/com/petcare/backend/security/JwtTokenProvider.java
package com.petcare.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
import java.util.Map;

@Component
public class JwtTokenProvider {
  // ganti SECRET ini via env var/props di produksi
  private final Key key = Keys.hmacShaKeyFor("super-secret-key-change-me-32bytes!".getBytes());
  private final long EXP_MS = 1000L * 60 * 60 * 12; // 12 jam

  public String generateToken(String email, String role) {
    Date now = new Date();
    Date exp = new Date(now.getTime() + EXP_MS);
    return Jwts.builder()
        .setSubject(email)
        .addClaims(Map.of("role", role))
        .setIssuedAt(now)
        .setExpiration(exp)
        .signWith(key, SignatureAlgorithm.HS256)
        .compact();
  }

  public Jws<Claims> parse(String token) {
    return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
  }
}
