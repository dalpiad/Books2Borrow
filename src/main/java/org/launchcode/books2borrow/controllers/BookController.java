package org.launchcode.books2borrow.controllers;

import jakarta.validation.Valid;
import org.launchcode.books2borrow.data.BookRepository;
import org.launchcode.books2borrow.models.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import java.util.List;
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
    public ResponseEntity<?> processAddBook(@RequestBody @Valid Book newBook,
                                           Errors errors){
        if(errors.hasErrors()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        bookRepository.save(newBook);
        return new ResponseEntity<>(HttpStatus.OK);
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

}
