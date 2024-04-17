package org.launchcode.books2borrow.controllers;


import org.launchcode.books2borrow.data.CustomerRepository;
import org.launchcode.books2borrow.data.WishlistItemRepository;
import org.launchcode.books2borrow.models.WishlistItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("{userId}")
    public ResponseEntity<?> wishlist(@PathVariable Integer userId) {
        List<WishlistItem> customersWishlist = customerRepository.findById(Long.valueOf(userId)).get().getWishlist();
        return new ResponseEntity<>(customersWishlist, HttpStatus.OK);
    }

    @PostMapping("addToWishlist")
    public ResponseEntity<String> addToWishlist(@RequestBody WishlistItem wishlistItem) {
        wishlistItemRepository.save(wishlistItem);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteWishItem(@PathVariable Integer id) {
        Optional<WishlistItem> wishlistOptional = wishlistItemRepository.findById(id);
        if (wishlistOptional.isPresent()) {
            wishlistItemRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
