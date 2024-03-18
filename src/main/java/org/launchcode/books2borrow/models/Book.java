package org.launchcode.books2borrow.models;

import jakarta.persistence.OneToOne;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Date;

public class Book extends AbstractEntity {

    @Size(min = 3, max = 50)
    @NotBlank
    private String title;

    @Size(min = 3, max = 50)
    @NotBlank
    private String author;

    @Size(min = 3, max = 50)
    @NotBlank
    private String genre;

    @NotBlank
    private Double isbn;

    @NotBlank
    private Date checkoutDate;

    @NotBlank
    private Date returnDate;

    @NotNull
    private boolean isAvailable;

    @OneToOne
    @Valid
    private String userEmail;


    public Book(String title, String author, String genre, Double isbn, Date checkoutDate, Date returnDate, boolean isAvailable, String userEmail) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.isbn = isbn;
        this.checkoutDate = checkoutDate;
        this.returnDate = returnDate;
        this.isAvailable = isAvailable;
        this.userEmail = userEmail;
    }

    @Override
    public String toString() {
        return "Book{" +
                "title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", genre='" + genre + '\'' +
                ", isbn=" + isbn +
                ", checkoutDate=" + checkoutDate +
                ", returnDate=" + returnDate +
                ", isAvailable=" + isAvailable +
                ", userEmail='" + userEmail + '\'' +
                '}';
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getGenre() {
        return genre;
    }

    public Double getIsbn() {
        return isbn;
    }

    public Date getCheckoutDate() {
        return checkoutDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public void setIsbn(Double isbn) {
        this.isbn = isbn;
    }

    public void setCheckoutDate(Date checkoutDate) {
        this.checkoutDate = checkoutDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}
