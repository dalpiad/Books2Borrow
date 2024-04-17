package org.launchcode.books2borrow.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private Customer sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipient_id")
    private Customer recipient;

    private String content;

    private LocalDateTime sentAt;


    public Message(Customer sender, Customer recipient, String content, LocalDateTime sentAt) {
        this.sender = sender;
        this.recipient = recipient;
        this.content = content;
        this.sentAt = sentAt;
    }

    public Message() {};

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", sender=" + sender +
                ", recipient=" + recipient +
                ", content='" + content + '\'' +
                ", sentAt=" + sentAt +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Message message = (Message) o;
        return Objects.equals(id, message.id) && Objects.equals(sender, message.sender) && Objects.equals(recipient, message.recipient) && Objects.equals(content, message.content) && Objects.equals(sentAt, message.sentAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, sender, recipient, content, sentAt);
    }

    public Long getId() {
        return id;
    }

    public String getSender() {
        return sender.getEmail();
    }

    public void setSender(Customer sender) {
        this.sender = sender;
    }

    public String getRecipient() {
        return recipient.getEmail();
    }

    public void setRecipient(Customer recipient) {
        this.recipient = recipient;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }
}
