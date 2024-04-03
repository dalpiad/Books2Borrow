package org.launchcode.books2borrow.controllers;


import org.launchcode.books2borrow.data.MessageRepository;
import org.launchcode.books2borrow.data.UserRepository;
import org.launchcode.books2borrow.models.Message;
import org.launchcode.books2borrow.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageRepository messageRepository;

    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestBody Message message) {
        message.setSentAt(LocalDateTime.now());
        Message savedMessage = (Message) messageRepository.save(message);
        return ResponseEntity.ok(savedMessage);

    }

    @GetMapping("/{senderId}/{receiverId}")
    public ResponseEntity<List<Message>> getMessages(@PathVariable Long senderId, @PathVariable Long receiverId) {
        User sender = userRepository.findById(senderId).orElse(null);
        User receiver = userRepository.findById(receiverId).orElse(null);
        if (sender != null && receiver != null) {
            List<Message> messages = messageRepository.findBySenderAndReceiver(sender, receiver);
            return ResponseEntity.ok(messages);
        } else {
            return ResponseEntity.notFound().build();
        }
    }




}
