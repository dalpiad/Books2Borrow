package org.launchcode.books2borrow.controllers;

import org.launchcode.books2borrow.data.BookRepository;
import org.launchcode.books2borrow.data.CustomerRepository;
import org.launchcode.books2borrow.dto.BookDTO;
import org.launchcode.books2borrow.models.Book;
import org.launchcode.books2borrow.models.Customer;
import org.launchcode.books2borrow.models.WishlistItem;
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
@RequestMapping("api/books")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CustomerRepository customerRepository;


    //  Using this controller for the borrow function in the wishlist and books details.
    @GetMapping("/all")
    public ResponseEntity<?> getAllBooks() {
        List<Book> books = (List<Book>) bookRepository.findAll();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookById(@PathVariable Integer id) {

        Optional<Book> bookOptional = bookRepository.findById(id);
        if (bookOptional.isPresent()) {
            return new ResponseEntity<>(bookOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/home")
    public ResponseEntity<?> getUniqueBooks() {
        List<Book> allBooks = (List<Book>) bookRepository.findAll();
        List<Book> uniqueBooks = new ArrayList<>();
        for (Book aBook : allBooks) {
            boolean containsBook = uniqueBooks.stream().anyMatch(book -> book.getBookKey().equals(aBook.getBookKey()));
            if (!containsBook) {
                uniqueBooks.add(aBook);
            }
        }
        return new ResponseEntity<>(uniqueBooks, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> processAddBook(Authentication authentication, @RequestBody BookDTO aBookDTO){
        int customerId;
        List<Customer> customers = customerRepository.findByEmail(authentication.getName());
        if (!customers.isEmpty()) {
            customerId = customers.get(0).getId();
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Book newBook = createNewBook(aBookDTO, customerId);
        bookRepository.save(newBook);
        return new ResponseEntity<>(HttpStatus.OK);
    };


    @GetMapping("/delete")
    public ResponseEntity<?> displayUserBooks(Authentication authentication){
        int customerId;
        List<Customer> customers = customerRepository.findByEmail(authentication.getName());
            if (!customers.isEmpty()) {
                customerId = customers.get(0).getId();
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

        List<Book> books = bookRepository.findByCustomerId(customerId);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBook(Authentication authentication, @PathVariable Integer id) {
        int customerId;
        List<Customer> customers = customerRepository.findByEmail(authentication.getName());
        if (!customers.isEmpty()) {
            customerId = customers.get(0).getId();
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Optional<Book> bookOptional = bookRepository.findById(id);
        if (bookOptional.isPresent() && (bookOptional.get().getCustomerId() == customerId)) {
            bookRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    private Book createNewBook(BookDTO bookDTO, int customerId){
        String bookKey = bookDTO.getBookKey();
        String title = bookDTO.getTitle();
        int bookCover = bookDTO.getBookCover();
        ArrayList<String> author = new ArrayList<>(bookDTO.getAuthor());
        int firstPublishYear = bookDTO.getFirstPublishYear();
        double averageRating = bookDTO.getAverageRating();
        int numberOfReviews = bookDTO.getNumberOfReviews();
        ArrayList<String> subject = new ArrayList<>(bookDTO.getSubject());
        boolean isAvailable = bookDTO.getAvailable();

        return new Book(bookKey, title, bookCover, author, firstPublishYear, averageRating,
                numberOfReviews, subject, isAvailable, customerId);
    }
}
