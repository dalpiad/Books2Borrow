package org.launchcode.books2borrow.data;

import org.launchcode.books2borrow.models.Book;
import org.launchcode.books2borrow.models.Customer;
import org.launchcode.books2borrow.models.WishlistItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistItemRepository extends CrudRepository<WishlistItem, Integer>{
//    List<WishlistItem> findByCustomer(Customer customer);
    List<WishlistItem> findByCustomerId(int customerId);
}
