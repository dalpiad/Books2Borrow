package org.launchcode.books2borrow.dto;


import java.util.ArrayList;
import java.util.Map;

public class BookDTO {

    private String bookKey;

    private String title;

    private int bookCover;

    private String author;

    private int firstPublishYear;

    private double averageRating;

    private int numberOfReviews;

    private ArrayList<String> subject;

    private boolean isAvailable;

    public BookDTO(Map<String, Object> bookJSON) {
        this.bookKey = (String) bookJSON.get("bookKey");
        this.title = (String) bookJSON.get("title");
        this.bookCover = (int) bookJSON.get("bookCover");
        this.author = (String) bookJSON.get("author");
        this.firstPublishYear = (int) bookJSON.get("firstPublishYear");
        this.averageRating = (double) bookJSON.get("averageRating");
        this.numberOfReviews = (int) bookJSON.get("numberOfReviews");
        this.subject = (ArrayList<String>) bookJSON.get("subject");
        this.isAvailable = (boolean) bookJSON.get("isAvailable");
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

    public int getBookCover() {
        return bookCover;
    }

    public void setBookCover(int bookCover) {
        this.bookCover = bookCover;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getFirstPublishYear() {
        return firstPublishYear;
    }

    public void setFirstPublishYear(int firstPublishYear) {
        this.firstPublishYear = firstPublishYear;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public int getNumberOfReviews() {
        return numberOfReviews;
    }

    public void setNumberOfReviews(int numberOfReviews) {
        this.numberOfReviews = numberOfReviews;
    }

    public ArrayList<String> getSubject() {
        return subject;
    }

    public void setSubject(ArrayList<String> subject) {
        this.subject = subject;
    }

    public boolean getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(boolean isAvailable) {
        this.isAvailable = isAvailable;
    }
}
