package org.launchcode.books2borrow.data;

import org.launchcode.books2borrow.models.Checkout;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CheckoutRepository extends CrudRepository<Checkout, Integer> {

}
