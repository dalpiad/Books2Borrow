package org.launchcode.books2borrow.data;

import org.launchcode.books2borrow.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderIdAndRecipientId(int senderId, int recipientId);
    List<Message> findBySenderId(int senderId);
    List<Message> findByRecipientId(int recipientId);
}
