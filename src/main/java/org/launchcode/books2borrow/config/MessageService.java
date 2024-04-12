package org.launchcode.books2borrow.config;

import org.launchcode.books2borrow.data.CustomerRepository;
import org.launchcode.books2borrow.data.MessageRepository;
import org.launchcode.books2borrow.models.Customer;
import org.launchcode.books2borrow.models.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {


    @Autowired
    private MessageRepository messageRepository;


    public List<Message> getMessages(Customer sender, Customer recipient) {
        return messageRepository.findBySenderOrRecipient(sender, recipient);
    }

    public Message sendMessage(Customer sender, Customer recipient, String content) {
        // Create a new message and save it to the database
        Message message = new Message();
        message.setSender(sender);
        message.setRecipient(recipient);
        message.setContent(content);
        message.setSentAt(LocalDateTime.now());
        return messageRepository.save(message);
    }
}
