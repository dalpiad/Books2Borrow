package org.launchcode.books2borrow.models;

import jakarta.persistence.Entity;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
public class User extends AbstractEntity {

    @NotBlank (message = "First Name is required")
    private String firstName;
    @NotBlank (message = "Zip code is required")
    private Integer zipCode;

    //userEmail will serve as userName for login
    @Email(message = "Invalid email. Try again")
    @NotBlank (message = "Email is required")
    private String userEmail;
    @NotNull
    private String pwHash;

    private String role; //have not decided whether this should be a string "user" or "admin" OR if this should be a boolean isAdmin?

    // add encoder
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


    // constructors
    public User() {
    }

    //constructor with encoder to store pwHash
    public User(String userEmail, String password) {
        this.userEmail = userEmail;
        this.pwHash = encoder.encode(password);
    }

    //constructor without pwHash
    public User(String firstName, Integer zipCode, String userEmail, String role) {
        this.firstName = firstName;
        this.zipCode = zipCode;
        this.userEmail = userEmail;
        this.role = role;
    }
    //generated toString

    @Override
    public String toString() {
        return "User{" +
                "firstName='" + firstName + '\'' +
                ", zipCode=" + zipCode +
                ", userEmail='" + userEmail + '\'' +
                ", role='" + role + '\'' +
                '}';
    }

    // getters
    public String getFirstName() {
        return firstName;
    }

    public Integer getZipCode() {
        return zipCode;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getRole() {
        return role;
    }

    //setters
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setZipCode(Integer zipCode) {
        this.zipCode = zipCode;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // passes entered password to check if password == pwHash -> returns T/F
    public boolean isMatchingPassword(String password) {
        return encoder.matches(password, pwHash);
    }
}

