package org.launchcode.books2borrow.data;

import org.launchcode.books2borrow.models.Book;
import org.launchcode.books2borrow.models.Checkout;
import org.launchcode.books2borrow.models.Customer;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CheckoutRepository extends CrudRepository<Checkout, Integer> {
    List<Checkout> findByCustomerId(int id);
}
