package org.launchcode.books2borrow.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
public class WishlistItem {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @Column(name = "wishlistItem_id")
    private int id;

//    @ManyToOne()
//    private Customer customer;

    @NotNull
    private int customerId;

    @NotNull
    private String bookKey;

    @NotNull
    private String title;

    private int bookCover;

    private boolean isAvailable;

//    public WishlistItem(Customer customer, String bookKey, String title, int bookCover, boolean isAvailable) {
//        this.customer = customer;
//        this.bookKey = bookKey;
//        this.title = title;
//        this.bookCover = bookCover;
//        this.isAvailable = isAvailable;
//    }


    public WishlistItem(int customerId, String bookKey, String title, int bookCover, boolean isAvailable) {
        this.customerId = customerId;
        this.bookKey = bookKey;
        this.title = title;
        this.bookCover = bookCover;
        this.isAvailable = isAvailable;
    }

    public WishlistItem() {}

    public int getId() {
        return id;
    }

//    public Customer getCustomer() {
//        return customer;
//    }
//
//    public void setCustomer(Customer customer) {
//        this.customer = customer;
//    }


    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
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
