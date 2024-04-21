package org.launchcode.books2borrow.config;

import org.launchcode.books2borrow.data.MessageRepository;
import org.launchcode.books2borrow.models.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;


    public List<Message> getMessagesBetweenUsers(int userId, int interlocutorId) {
        List<Message> conversationRecord = new ArrayList<Message>();
            conversationRecord.addAll(messageRepository.findBySenderIdAndRecipientId(userId, interlocutorId));
            conversationRecord.addAll(messageRepository.findBySenderIdAndRecipientId(interlocutorId, userId));
        conversationRecord.sort(Comparator.comparing(Message::getSentAt));

        return conversationRecord;
    }

    public List<Message> getUserMessages(int userId) {
        List<Message> userSender = messageRepository.findBySenderId(userId);
        List<Message> userRecipient = messageRepository.findByRecipientId(userId);
        List<Message> userMessages = new ArrayList<Message>();
            userMessages.addAll(userSender);
            userMessages.addAll(userRecipient);
            userMessages.sort(Comparator.comparing(Message::getSentAt));
        return userMessages;
    }

    public Message sendMessage(Message message) {
        return messageRepository.save(message);
    }
}
