package org.launchcode.books2borrow.controllers;

import org.launchcode.books2borrow.config.MessageService;
import org.launchcode.books2borrow.models.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/{senderId}/{recipientId}")
    public ResponseEntity<List<Message>> getMessagesBetweenUsers(
            @PathVariable Long senderId, @PathVariable Long recipientId) {
        List<Message> messages = messageService.getMessagesBetweenUsers(senderId, recipientId);
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody Message message) {
        Message sentMessage = messageService.sendMessage(message);
        return ResponseEntity.ok(sentMessage);
    }

}
