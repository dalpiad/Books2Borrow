package org.launchcode.books2borrow.controllers;

        import org.launchcode.books2borrow.data.BookRepository;
        import org.launchcode.books2borrow.data.CheckoutRepository;
        import org.launchcode.books2borrow.data.CustomerRepository;
        import org.launchcode.books2borrow.dto.CheckoutDTO;
        import org.launchcode.books2borrow.models.Book;
        import org.launchcode.books2borrow.models.Checkout;
        import org.launchcode.books2borrow.models.Customer;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.security.core.Authentication;
        import org.springframework.web.bind.annotation.*;

        import java.util.ArrayList;
        import java.util.List;
        import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173/", maxAge = 3600)
@RestController
@RequestMapping("api/dashboard")
public class DashboardController {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CheckoutRepository checkoutRepository;

    @GetMapping("/lent/{id}")
    public ResponseEntity<?> lentBooks(Authentication authentication, @PathVariable Integer id) {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer != null) {
            List<Book> books = bookRepository.findByCustomerId(id);
            List<Book> lentBook = new ArrayList<>();
            for (Book lBook : books) {
                Book book1 = bookRepository.findById(lBook.getId());
                boolean containsBook = lentBook.stream().anyMatch(book -> book.getBookKey().equals(book1.getBookKey()));
                if(book1 != null && !containsBook && !book1.isAvailable()) {
                    lentBook.add(book1);
                }
            }
            return new ResponseEntity<>(lentBook, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/borrow/{id}")
    public ResponseEntity<?> borrowedBooks(Authentication authentication, @PathVariable Integer id) {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer != null) {
            List<Checkout> checkout = (List<Checkout>) checkoutRepository.findByCustomerId(id);
            List<Book> borrowedBook = new ArrayList<>();
            for (Checkout cBook : checkout) {
                Book book1 = bookRepository.findById(cBook.getBookId());
                boolean containsBook = borrowedBook.stream().anyMatch(book -> book.getBookKey().equals(book1.getBookKey()));
                if(book1 != null && !containsBook) {
                    borrowedBook.add(book1);
                }
            }
            return new ResponseEntity<>(borrowedBook, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
