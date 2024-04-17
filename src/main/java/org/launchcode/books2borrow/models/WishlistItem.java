package org.launchcode.books2borrow.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class WishlistItem {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @Column(name = "wishlistItem_id")
    private int id;

    @ManyToOne()
    private Customer customer;

    @NotNull
    private String bookKey;

    @NotNull
    private String title;

    private int bookCover;

    @NotBlank
    private boolean isAvailable;

    public WishlistItem(int id, Customer customer, String bookKey, String title, int bookCover, boolean isAvailable) {
        this.customer = customer;
        this.bookKey = bookKey;
        this.title = title;
        this.bookCover = bookCover;
        this.isAvailable = isAvailable;
    }

    public WishlistItem() {}

    public int getId() {
        return id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getBookKey() {
        return bookKey;
    }

    public void setBookKey(String bookKey) {
        this.bookKey = bookKey;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getBookCover() {
        return bookCover;
    }

    public void setBookCover(int bookCover) {
        this.bookCover = bookCover;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}
