package org.launchcode.books2borrow.dto;


import java.util.Map;

public class BookDTO {

    private String bookKey;

    private String title;

    private String bookCover;

    private String author;

    private String firstPublishYear;

    private String averageRating;

    private String numberOfReviews;

    private String subject;

    private String isAvailable;

    public BookDTO(Map<String, String> bookJSON) {
        this.bookKey = (String) bookJSON.get("bookKey");
        this.title = (String) bookJSON.get("title");
        this.bookCover = (String) bookJSON.get("bookCover");
        this.author = (String) bookJSON.get("author");
        this.firstPublishYear = (String) bookJSON.get("firstPublishYear");
        this.averageRating = (String) bookJSON.get("averageRating");
        this.numberOfReviews = (String) bookJSON.get("numberOfReviews");
        this.subject = (String) bookJSON.get("subject");
        this.isAvailable = (String) bookJSON.get("isAvailable");
    }


    public String getBookKey() {
        return bookKey;
    }

    public void setBookKey(String bookKey) {
        this.bookKey = bookKey;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBookCover() {
        return bookCover;
    }

    public void setBookCover(String bookCover) {
        this.bookCover = bookCover;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getFirstPublishYear() {
        return firstPublishYear;
    }

    public void setFirstPublishYear(String firstPublishYear) {
        this.firstPublishYear = firstPublishYear;
    }

    public String getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(String averageRating) {
        this.averageRating = averageRating;
    }

    public String getNumberOfReviews() {
        return numberOfReviews;
    }

    public void setNumberOfReviews(String numberOfReviews) {
        this.numberOfReviews = numberOfReviews;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(String isAvailable) {
        this.isAvailable = isAvailable;
    }
}
