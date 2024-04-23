package org.launchcode.books2borrow.controllers;
import org.launchcode.books2borrow.data.BookRepository;
import org.launchcode.books2borrow.data.CheckoutRepository;
import org.launchcode.books2borrow.data.CustomerRepository;
import org.launchcode.books2borrow.dto.CheckoutDTO;
import org.launchcode.books2borrow.filter.AuthoritiesLoggingAtFilter;
import org.launchcode.books2borrow.models.Book;
import org.launchcode.books2borrow.models.Checkout;
import org.launchcode.books2borrow.models.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@CrossOrigin(origins = "http://localhost:5173/", maxAge = 3600)
@RestController
@RequestMapping("api/borrow")
public class CheckoutController {
    private final Logger LOG =
            Logger.getLogger(AuthoritiesLoggingAtFilter.class.getName());

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Autowired
    private BookRepository bookRepository;

    @PostMapping("/checkout")
    public  ResponseEntity<?>  checkoutBook(Authentication authentication, @RequestBody CheckoutDTO aCheckoutDTO) {
        LOG.info("Inside Checkout");
        Book book = bookRepository.findById(aCheckoutDTO.getBookId());
        book.setAvailable(false);
        String bookTitle = book.getTitle();
        List<Customer> customer = customerRepository.findByEmail(authentication.getName());
        int borrowerId = customer.get(0).getId();
        String borrowerName = customer.get(0).getName();
        int lenderId = book.getCustomerId();
        Customer lenders = customerRepository.findById(lenderId);
        String lenderName = lenders.getName();
        Checkout newCheckout = createNewCheckout(aCheckoutDTO.getBookId(), bookTitle, lenderId, lenderName, borrowerId, borrowerName);
        checkoutRepository.save(newCheckout);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/return")
    public  ResponseEntity<?>  returnBook(Authentication authentication, @RequestBody CheckoutDTO aCheckoutDTO) {
        LOG.info("Inside Checkout return");
        Checkout checkout = checkoutRepository.findById(aCheckoutDTO.getCheckoutId());
        checkout.setCheckedout(false);
        checkoutRepository.save(checkout);
        Book book = bookRepository.findById(checkout.getBookId());
        book.setAvailable(true);
        bookRepository.save(book);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/lent")
    public ResponseEntity<?> lentBooks(Authentication authentication) {
        List<Customer> customer = customerRepository.findByEmail(authentication.getName());
        int lenderId = customer.get(0).getId();
        List<Checkout> checkout = checkoutRepository.findByLenderId(lenderId);
        List<Checkout> lentBook = new ArrayList<>();
        for (Checkout bCheckout : checkout) {
            if (bCheckout.isCheckedout()) {
                lentBook.add(bCheckout);
            }
        }
        return new ResponseEntity<>(lentBook, HttpStatus.OK);
    }

    @GetMapping("/borrowed")
    public ResponseEntity<?> borrowedBooks(Authentication authentication) {
        List<Customer> customer = customerRepository.findByEmail(authentication.getName());
        int borrowerId = customer.get(0).getId();
        List<Checkout> checkout = checkoutRepository.findByBorrowerId(borrowerId);
        List<Checkout> borrowedBook = new ArrayList<>();
        for (Checkout bCheckout : checkout) {
            if (bCheckout.isCheckedout()) {
                borrowedBook.add(bCheckout);
            }
        }
        return new ResponseEntity<>(borrowedBook, HttpStatus.OK);
    }



    private Checkout createNewCheckout(int bookId, String bookTitle, int lenderId, String lenderName, int borrowerId,
                                       String borrowerName){
        LocalDateTime checkoutDate = LocalDateTime.now();
        LocalDateTime dueDate = checkoutDate.plusDays(14);
        return new Checkout(bookId, bookTitle, lenderId, lenderName, borrowerId, borrowerName, checkoutDate,dueDate,true);
    }
}