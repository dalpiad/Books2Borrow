package org.launchcode.books2borrow.controllers;

import org.launchcode.books2borrow.config.MessageService;
import org.launchcode.books2borrow.data.CustomerRepository;
import org.launchcode.books2borrow.models.Customer;
import org.launchcode.books2borrow.models.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private CustomerRepository customerRepository;


    @Autowired
    private MessageService messageService;

    @RequestMapping("/all")
    public ResponseEntity<?> getMessagesBetweenUsers(Authentication authentication, @RequestBody int recipientId) {
        int userId;
        List<Customer> customers = customerRepository.findByEmail(authentication.getName());
        if (!customers.isEmpty()) {
            userId = customers.get(0).getId();
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Message> messages = messageService.getMessagesBetweenUsers(userId, recipientId);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }


    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(Authentication authentication, @RequestBody Message partialMessage) {
        int senderId;
        List<Customer> customers = customerRepository.findByEmail(authentication.getName());
        if (!customers.isEmpty()) {
            senderId = customers.get(0).getId();
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        int recipientId = partialMessage.getRecipientId();
        String content = partialMessage.getContent();
        LocalDateTime sentAt = LocalDateTime.now();
        Message message = new Message(senderId, recipientId, content, sentAt);
        Message sentMessage = messageService.sendMessage(message);
        return ResponseEntity.ok(sentMessage);
    }

}
