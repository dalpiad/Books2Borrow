package org.launchcode.books2borrow.dto;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class BookDTO {

    private String bookKey;

    private String title;

    private Integer bookCover;

    private ArrayList<String> author;

    private Integer firstPublishYear;

    private Double averageRating;

    private Integer numberOfReviews;

    private ArrayList<String> subject;

    private Boolean isAvailable;

    public BookDTO(String bookKey, String title, int bookCover, ArrayList<String> author, int firstPublishYear,
                   double averageRating, int numberOfReviews, ArrayList<String> subject, boolean isAvailable) {
        this.bookKey = (String) bookKey;
        this.title = (String) title;
        this.bookCover = (int) bookCover;
        this.author = (ArrayList<String>) author;
        this.firstPublishYear = (int) firstPublishYear;
        this.averageRating = (double) averageRating;
        this.numberOfReviews = (int) numberOfReviews;
        this.subject = (ArrayList<String>) subject;
        this.isAvailable = (boolean) isAvailable;
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

    public Integer getBookCover() {
        return bookCover;
    }

    public void setBookCover(Integer bookCover) {
        this.bookCover = bookCover;
    }

    public ArrayList<String> getAuthor() {
        return author;
    }

    public void setAuthor(ArrayList<String> author) {
        this.author = author;
    }

    public Integer getFirstPublishYear() {
        return firstPublishYear;
    }

    public void setFirstPublishYear(Integer firstPublishYear) {
        this.firstPublishYear = firstPublishYear;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Integer getNumberOfReviews() {
        return numberOfReviews;
    }

    public void setNumberOfReviews(Integer numberOfReviews) {
        this.numberOfReviews = numberOfReviews;
    }

    public ArrayList<String> getSubject() {
        return subject;
    }

    public void setSubject(ArrayList<String> subject) {
        this.subject = subject;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
    }
}
