package org.launchcode.books2borrow.dto;

        import org.launchcode.books2borrow.models.Book;
        import org.launchcode.books2borrow.models.Customer;

        import java.time.LocalDateTime;

public class CheckoutDTO {

    private int bookId;

    private int checkoutId;

    public CheckoutDTO(int bookId, int checkoutId) {
        this.bookId =  bookId;
        this.checkoutId = checkoutId;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public int getCheckoutId() {
        return checkoutId;
    }

    public void setCheckoutId(int checkoutId) {
        this.checkoutId = checkoutId;
    }
}
