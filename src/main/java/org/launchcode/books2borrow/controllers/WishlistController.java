package org.launchcode.books2borrow.controllers;

import org.launchcode.books2borrow.data.BookRepository;
import org.launchcode.books2borrow.data.CustomerRepository;
import org.launchcode.books2borrow.data.WishlistItemRepository;
import org.launchcode.books2borrow.models.Book;
import org.launchcode.books2borrow.models.Customer;
import org.launchcode.books2borrow.models.WishlistItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("wishlist")
public class WishlistController {

    @Autowired
    private WishlistItemRepository wishlistItemRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private BookRepository bookRepository;

    @RequestMapping("/all")
    public ResponseEntity<?> wishlist(Authentication authentication) {
        int userId;
        List<Customer> customers = customerRepository.findByEmail(authentication.getName());
        if (!customers.isEmpty()) {
            userId = customers.get(0).getId();
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<WishlistItem> customersWishlist = wishlistItemRepository.findByCustomerId(userId);

        return new ResponseEntity<>(customersWishlist, HttpStatus.OK);
    }

    @PostMapping("/addToWishlist")
    public ResponseEntity<?> addToWishlist(Authentication authentication, @RequestBody WishlistItem partialWishlistItem) {
    //Map<String, String> wishlistMap) {
        int customerId;
        List<Customer> customers = customerRepository.findByEmail(authentication.getName());
        if (!customers.isEmpty()) {
            customerId = customers.get(0).getId();
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        String bookKey = partialWishlistItem.getBookKey();
        String title = partialWishlistItem.getTitle();
        int bookCover = partialWishlistItem.getBookCover();

        boolean isAvailable = false;
        List<Book> matchingBooks = bookRepository.findByBookKey(bookKey);
            for(int i = 0; i < matchingBooks.size(); i++) {
                if (matchingBooks.get(i).isAvailable()) {
                    isAvailable = true;
                    break;
                }
            };
        WishlistItem wishlistItem = new WishlistItem(customerId, bookKey, title, bookCover, isAvailable);
        wishlistItemRepository.save(wishlistItem);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteWishItem(Authentication authentication, @PathVariable int id) {
        int userId;
        List<Customer> customers = customerRepository.findByEmail(authentication.getName());
        if (!customers.isEmpty()) {
            userId = customers.get(0).getId();
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Optional<WishlistItem> wishlistOptional = wishlistItemRepository.findById(id);
        if (wishlistOptional.isPresent() && (wishlistOptional.get().getCustomerId() == userId)) {
            wishlistItemRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
