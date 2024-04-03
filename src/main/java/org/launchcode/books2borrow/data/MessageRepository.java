package org.launchcode.books2borrow.data;

import org.launchcode.books2borrow.models.Message;
import org.launchcode.books2borrow.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderAndReceiver(User sender, User receiver);
}
