package org.launchcode.books2borrow.models;

import jakarta.persistence.Entity;
import org.launchcode.books2borrow.data.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

@Entity
public class Checkout  extends AbstractEntity{


    private int bookId;

    private String bookTitle;
    private int lenderId;

    private String lenderName;

    private int borrowerId;

    private String borrowerName;

    private LocalDateTime checkoutDate;

    private LocalDateTime dueDate;

    private boolean isCheckedout;

    public Checkout(int bookId, String bookTitle, int lenderId, String lenderName, int borrowerId,
                    String borrowerName, LocalDateTime checkoutDate, LocalDateTime dueDate,boolean isCheckedout) {
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.lenderId = lenderId;
        this.lenderName = lenderName;
        this.borrowerId = borrowerId;
        this.borrowerName = borrowerName;
        this.checkoutDate = checkoutDate;
        this.dueDate = dueDate;
        this.isCheckedout = isCheckedout;
    }

    public Checkout() {
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public int getLenderId() {
        return lenderId;
    }

    public void setLenderId(int lenderId) {
        this.lenderId = lenderId;
    }

    public String getLenderName() {
        return lenderName;
    }

    public void setLenderName(String lenderName) {
        this.lenderName = lenderName;
    }

    public int getBorrowerId() {
        return borrowerId;
    }

    public void setBorrowerId(int borrowerId) {
        this.borrowerId = borrowerId;
    }

    public String getBorrowerName() {
        return borrowerName;
    }

    public void setBorrowerName(String borrowerName) {
        this.borrowerName = borrowerName;
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

    public boolean isCheckedout() {
        return isCheckedout;
    }

    public void setCheckedout(boolean checkedout) {
        isCheckedout = checkedout;
    }
}
