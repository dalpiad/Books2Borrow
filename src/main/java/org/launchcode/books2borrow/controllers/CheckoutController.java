package org.launchcode.books2borrow.controllers;
        import org.launchcode.books2borrow.data.BookRepository;
        import org.launchcode.books2borrow.data.CheckoutRepository;
        import org.launchcode.books2borrow.data.CustomerRepository;
        import org.launchcode.books2borrow.dto.CheckoutDTO;
        import org.launchcode.books2borrow.filter.AuthoritiesLoggingAtFilter;
        import org.launchcode.books2borrow.models.Book;
        import org.launchcode.books2borrow.models.Checkout;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;
        import java.time.LocalDateTime;
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
    public  ResponseEntity<?>  checkoutBook(@RequestBody CheckoutDTO aCheckoutDTO) {
        LOG.info("Inside Checkout");
//        CheckoutDTO checkoutDTO = new CheckoutDTO(book,customer,checkoutDate);
        Checkout newCheckout = createNewCheckout(aCheckoutDTO);
        checkoutRepository.save(newCheckout);

        return new ResponseEntity<>(HttpStatus.OK);
    }
    private Checkout createNewCheckout(CheckoutDTO checkoutDTO ){
        int  bookId = checkoutDTO.getBookId();
        Book book = bookRepository.findById(bookId);
        if (book != null) {
            book.setAvailable(false);
            bookRepository.save(book);
        }
        int customerId = checkoutDTO.getCustomerId();
        LocalDateTime checkoutDate = LocalDateTime.now();
        LocalDateTime dueDate = checkoutDate.plusDays(14);
        return new Checkout(bookId, customerId, checkoutDate,dueDate);
    }

}
