package org.launchcode.books2borrow.controllers;

import org.launchcode.books2borrow.data.BookRepository;
import org.launchcode.books2borrow.dto.BookDTO;
import org.launchcode.books2borrow.models.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173/", maxAge = 3600)
@RestController
@RequestMapping("api/books")
public class BookController {

    @Autowired
    private BookRepository bookRepository;


    //This needs to be reworked to find only the users book
    @GetMapping
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


    @PostMapping("/add")
    public void processAddBook(@RequestBody Map<String, String> bookJSON){
        BookDTO bookDTO = new BookDTO(bookJSON);
        Book newBook = createNewBook(bookDTO);
        bookRepository.save(newBook);
    };

    @GetMapping("/delete")
    public ResponseEntity<?> displayUserBooks(){
        List<Book> books = (List<Book>) bookRepository.findAll();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Integer id) {
        Optional<Book> bookOptional = bookRepository.findById(id);
        if (bookOptional.isPresent()) {
            bookRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    private Book createNewBook(BookDTO bookDTO){
        String bookKey = bookDTO.getBookKey();
        String title = bookDTO.getTitle();
        int bookCover = Integer.parseInt(bookDTO.getBookCover());
        String author = bookDTO.getAuthor();
        int firstPublishYear = Integer.parseInt(bookDTO.getFirstPublishYear());
        double averageRating = Double.parseDouble(bookDTO.getAverageRating());
        int numberOfReviews = Integer.parseInt(bookDTO.getNumberOfReviews());
        ArrayList<String> subject = new ArrayList<>();
        String[] subjectArray = bookDTO.getSubject().split(",");
        for (String aSubject : subjectArray) {
            subject.add(aSubject.trim());
        }
        boolean isAvailable = Boolean.parseBoolean(bookDTO.getIsAvailable());

        return new Book(bookKey, title, bookCover, author, firstPublishYear, averageRating,
                numberOfReviews, subject, isAvailable);
    }

}
