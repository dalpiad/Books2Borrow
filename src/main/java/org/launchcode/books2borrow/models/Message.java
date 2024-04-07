package org.launchcode.books2borrow.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Customer sender;
    @ManyToOne
    private Customer receiver;
    private String content;
    private LocalDateTime sentAt;


    public Message(Long id, Customer sender, Customer receiver, String content, LocalDateTime sentAt) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.sentAt = sentAt;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", sender=" + sender +
                ", receiver=" + receiver +
                ", content='" + content + '\'' +
                ", sentAt=" + sentAt +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Message message = (Message) o;
        return Objects.equals(id, message.id) && Objects.equals(sender, message.sender) && Objects.equals(receiver, message.receiver) && Objects.equals(content, message.content) && Objects.equals(sentAt, message.sentAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, sender, receiver, content, sentAt);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Customer getSender() {
        return sender;
    }

    public void setSender(Customer sender) {
        this.sender = sender;
    }

    public Customer getReceiver() {
        return receiver;
    }

    public void setReceiver(Customer receiver) {
        this.receiver = receiver;
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
