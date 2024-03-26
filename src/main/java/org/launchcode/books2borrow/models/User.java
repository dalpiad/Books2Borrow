package org.launchcode.books2borrow.models;

import jakarta.persistence.Entity;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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

    private boolean isAdmin;

    //bookLibrary
    private ArrayList<String> bookLibrary;

    //wishlist
    private ArrayList<String> wishlist;

    // add encoder
//    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


    // constructors

    //no arg constructor
    public User() {
    }

    //constructor with encoder to store pwHash

    //constructor without pwHash

    public User(String firstName, Integer zipCode, String userEmail, boolean isAdmin, ArrayList<String> bookLibrary, ArrayList<String> wishlist) {
        this.firstName = firstName;
        this.zipCode = zipCode;
        this.userEmail = userEmail;
        this.isAdmin = isAdmin;
        this.bookLibrary = bookLibrary;
        this.wishlist = wishlist;
    }


    //generated toString

    @Override
    public String toString() {
        return "User{" +
                "firstName='" + firstName + '\'' +
                ", zipCode=" + zipCode +
                ", userEmail='" + userEmail + '\'' +
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

    public String getUserEmail() {
        return userEmail;
    }

    public String getPwHash() {
        return pwHash;
    }

    public boolean isAdmin() {
        return isAdmin;
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

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
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

