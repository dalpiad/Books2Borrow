package org.launchcode.books2borrow.data;

import org.launchcode.books2borrow.models.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BookRepository extends CrudRepository<Book, Integer> {
    List<Book> findByBookKey(String bookKey);
}
