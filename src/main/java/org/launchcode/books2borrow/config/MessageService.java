package org.launchcode.books2borrow.config;

import org.launchcode.books2borrow.data.MessageRepository;
import org.launchcode.books2borrow.models.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;


    public List<Message> getMessagesBetweenUsers(int senderId, int recipientId) {
        return messageRepository.findBySenderIdAndRecipientId(senderId, recipientId);
    }

    public Message sendMessage(Message message) {
        return messageRepository.save(message);
    }
}
