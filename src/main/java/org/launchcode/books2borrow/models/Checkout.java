package org.launchcode.books2borrow.models;

import jakarta.persistence.Entity;
import org.launchcode.books2borrow.data.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

@Entity
public class Checkout  extends AbstractEntity{


    private int bookId;

    private int customerId;
    private LocalDateTime checkoutDate;

    private LocalDateTime dueDate;

    public Checkout(int bookId, int customerId,LocalDateTime checkoutDate, LocalDateTime dueDate) {
        this.bookId = bookId;
        this.customerId = customerId;
        this.checkoutDate = checkoutDate;
        this.dueDate = dueDate;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public LocalDateTime getCheckoutDate() {
        return checkoutDate;
    }

    public void setCheckoutDate(LocalDateTime checkoutDate) {
        this.checkoutDate = checkoutDate;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }
}
