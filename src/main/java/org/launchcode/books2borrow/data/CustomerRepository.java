package org.launchcode.books2borrow.data;

import org.launchcode.books2borrow.models.Book;
import org.launchcode.books2borrow.models.Customer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Integer> {

    List<Customer> findByEmail(String email);

    Customer findById(int id);
    
}
