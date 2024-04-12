package org.launchcode.books2borrow.controllers;


import org.launchcode.books2borrow.config.MessageService;
import org.launchcode.books2borrow.data.CustomerRepository;
import org.launchcode.books2borrow.data.MessageRepository;
import org.launchcode.books2borrow.exceptions.UserNotFoundException;
import org.launchcode.books2borrow.models.Customer;
import org.launchcode.books2borrow.models.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {


    @Autowired
    private MessageService messageService;

    @Autowired
    private CustomerRepository customerRepository;


    @GetMapping("/{senderId}/{recipientId}")
    public List<Message> getMessages(@PathVariable Integer senderId, @PathVariable Integer recipientId) {
        // Retrieve messages between sender and recipient
        Customer sender = customerRepository.findById(senderId).orElseThrow(() -> new UserNotFoundException(senderId));
        Customer recipient = customerRepository.findById(recipientId).orElseThrow(() -> new UserNotFoundException(recipientId));
        return messageService.getMessages(sender, recipient);
    }


//    @MessageMapping("/chat.sendMessage")
//    @SendTo("/topic/public")
//    public Message sendMessage(@Payload Message message) {
//        // Save message to database or perform any other necessary actions
//        return message;
//    }
//
//
//    @Autowired
//    private SimpMessagingTemplate messagingTemplate;
//
//    @MessageMapping("/chat.sendPrivateMessage")
//    public void sendPrivateMessage(@Payload Message message, Principal principal) {
//        String recipient = message.getRecipient();
//        String sender = principal.getName();
//
//        // Send the message only to the specified recipient
//        messagingTemplate.convertAndSendToUser(recipient, "/queue/private", message);
//    }
//
//    @MessageMapping("/chat.private.{recipient}")
//    public void handlePrivateMessage(@Payload Message message, @DestinationVariable("recipient") String recipient, Principal principal) {
//        String sender = principal.getName();
//
//        // Process the private message as needed
//        // For example, you might save it to the database or perform other actions
//
//        // Send an acknowledgment to the sender
//        messagingTemplate.convertAndSendToUser(sender, "/queue/private", message);
//    }







//    @Autowired
//    private MessageRepository messageRepository;
//
//    private CustomerRepository customerRepository;
//
//    @PostMapping
//    public ResponseEntity<?> sendMessage(@RequestBody Message message) {
//        message.setSentAt(LocalDateTime.now());
//        Message savedMessage = (Message) messageRepository.save(message);
//        return ResponseEntity.ok(savedMessage);
//
//    }
//
//    @GetMapping("/{senderId}/{receiverId}")
//    public ResponseEntity<List<Message>> getMessages(@PathVariable int senderId, @PathVariable int receiverId) {
//        Customer sender = customerRepository.findById(senderId).orElse(null);
//        Customer receiver = customerRepository.findById(receiverId).orElse(null);
//        if (sender != null && receiver != null) {
//            List<Message> messages = messageRepository.findBySenderAndReceiver(sender, receiver);
//            return ResponseEntity.ok(messages);
//        } else return ResponseEntity.notFound().build();
//    }


}
