package org.launchcode.books2borrow.models;

import jakarta.persistence.Entity;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class User extends AbstractEntity {

    @NotBlank (message = "First Name is required")
    private String firstName;
    @NotBlank (message = "Zip code is required")
    private Integer zipCode;
    @Email(message = "Invalid email. Try again")
    @NotBlank (message = "Email is required")
    private String userEmail;
    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters")
    private String password;

    private String role; //have not decided whether this should be a string "user" or "admin" OR if this should be a boolean isAdmin?

    // constructor
    public User(String firstName, Integer zipCode, String userEmail, String password, String role) {
        this.firstName = firstName;
        this.zipCode = zipCode;
        this.userEmail = userEmail;
        this.password = password;
        this.role = role;
    }

    //generated toString

    @Override
    public String toString() {
        return "User{" +
                "firstName='" + firstName + '\'' +
                ", zipCode=" + zipCode +
                ", userEmail='" + userEmail + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }

    // getters and setters
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Integer getZipCode() {
        return zipCode;
    }

    public void setZipCode(Integer zipCode) {
        this.zipCode = zipCode;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

