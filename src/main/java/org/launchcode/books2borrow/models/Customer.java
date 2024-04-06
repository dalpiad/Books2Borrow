package org.launchcode.books2borrow.models;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
public class Customer extends AbstractEntity {

    @NotBlank (message = "First Name is required")
    private String firstName;
    @NotNull (message = "Zip code is required")
    private Integer zipCode;

    //userEmail will serve as userName for login
    @Email(message = "Invalid email. Try again")
    @NotBlank (message = "Email is required")
    private String email;
    @NotNull
    @NotBlank
    private String pwHash;
    @NotNull
    @NotBlank
    private String role;
    private ArrayList<String> bookLibrary;
    private ArrayList<String> wishlist;

    // add encoder
//    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


    // constructors

    //no arg constructor
    public Customer() {
    }

    //constructor with encoder to store pwHash

    //all arg constructor

    public Customer(String firstName, Integer zipCode, String email, String pwHash, String role, ArrayList<String> bookLibrary, ArrayList<String> wishlist) {
        this.firstName = firstName;
        this.zipCode = zipCode;
        this.email = email;
        this.pwHash = pwHash;
        this.role = role;
        this.bookLibrary = bookLibrary;
        this.wishlist = wishlist;
    }


    //generated toString

    @Override
    public String toString() {
        return "Customer{" +
                "firstName='" + firstName + '\'' +
                ", zipCode=" + zipCode +
                ", email='" + email + '\'' +
                ", bookLibrary=" + bookLibrary +
                ", wishlist=" + wishlist +
                '}';
    }


    // getters

    public String getFirstName() {
        return firstName;
    }

    public Integer getZipCode() {
        return zipCode;
    }

    public String getEmail() {
        return email;
    }

    public String getPwHash() {
        return pwHash;
    }

    public String getRole() {
        return role;
    }

    public ArrayList<String> getBookLibrary() {
        return bookLibrary;
    }

    public ArrayList<String> getWishlist() {
        return wishlist;
    }

    //setters

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setZipCode(Integer zipCode) {
        this.zipCode = zipCode;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setBookLibrary(ArrayList<String> bookLibrary) {
        this.bookLibrary = bookLibrary;
    }

    public void setWishlist(ArrayList<String> wishlist) {
        this.wishlist = wishlist;
    }


    // passes entered password to check if password == pwHash -> returns T/F
//    public boolean isMatchingPassword(String password) {
//        return encoder.matches(password, pwHash);
//    }
}

