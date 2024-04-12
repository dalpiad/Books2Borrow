package org.launchcode.books2borrow.models;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.launchcode.books2borrow.config.Books2BorrowUserDetails;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtUtils {

    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);  // Replace with your secret key
    private static final long EXPIRATION_TIME = 86400000; // 24 hours in milliseconds

    public static String generateToken(Customer userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .claims("authorities", userDetails.getAuthorities()) //Customer class needs to be reworked.
                .subject(userDetails.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY)
                .compact();
    }

    public static String extractUsername(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody().subject();
    }

    public static boolean validateToken(String token, Customer userDetails) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
            return claims.getBody().getSubject().equals(userDetails.getEmail()) && !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    private static boolean isTokenExpired(String token) {
        final Date expiration = Jwts.parser().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody().getExpiration();
        return expiration.before(new Date());
    }


}
