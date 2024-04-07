package org.launchcode.books2borrow.controllers;


import org.launchcode.books2borrow.data.CustomerRepository;
import org.launchcode.books2borrow.data.MessageRepository;
import org.launchcode.books2borrow.models.Customer;
import org.launchcode.books2borrow.models.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageRepository messageRepository;

    private CustomerRepository customerRepository;

    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestBody Message message) {
        message.setSentAt(LocalDateTime.now());
        Message savedMessage = (Message) messageRepository.save(message);
        return ResponseEntity.ok(savedMessage);

    }

    @GetMapping("/{senderId}/{receiverId}")
    public ResponseEntity<List<Message>> getMessages(@PathVariable int senderId, @PathVariable int receiverId) {
        Customer sender = customerRepository.findById(senderId).orElse(null);
        Customer receiver = customerRepository.findById(receiverId).orElse(null);
        if (sender != null && receiver != null) {
            List<Message> messages = messageRepository.findBySenderAndReceiver(sender, receiver);
            return ResponseEntity.ok(messages);
        } else return ResponseEntity.notFound().build();
    }


}
