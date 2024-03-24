package org.launchcode.books2borrow.models;

import jakarta.persistence.Entity;
import java.util.ArrayList;



@Entity
public class Book extends AbstractEntity {


    private String bookKey;

    private String title;

    private double bookCover;

    private String author;

    private double firstPublishYear;

    private double averageRating;

    private double numberOfReviews;

    private ArrayList<String> subject;

    private boolean isAvailable;

    //private boolean isOverdue;




    public Book(String bookKey, String title, double bookCover, String author, double firstPublishYear,
                double averageRating, double numberOfReviews, ArrayList<String> subject,
                boolean isAvailable) {
        super();
        this.bookKey = bookKey;
        this.title = title;
        this.bookCover = bookCover;
        this.author = author;
        this.firstPublishYear = firstPublishYear;
        this.averageRating = averageRating;
        this.numberOfReviews = numberOfReviews;
        this.subject = subject;
        this.isAvailable = isAvailable;
    }

    public Book () {}


    @Override
    public String toString() {
        return "Book{" +
                "bookKey='" + bookKey + '\'' +
                ", title='" + title + '\'' +
                ", bookCover=" + bookCover +
                ", author='" + author + '\'' +
                ", firstPublishYear=" + firstPublishYear +
                ", averageRating=" + averageRating +
                ", numberOfReviews=" + numberOfReviews +
                ", subject=" + subject +
                ", isAvailable=" + isAvailable +
                '}';
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

    public double getBookCover() {
        return bookCover;
    }

    public void setBookCover(double bookCover) {
        this.bookCover = bookCover;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public double getFirstPublishYear() {
        return firstPublishYear;
    }

    public void setFirstPublishYear(double firstPublishYear) {
        this.firstPublishYear = firstPublishYear;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public double getNumberOfReviews() {
        return numberOfReviews;
    }

    public void setNumberOfReviews(double numberOfReviews) {
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

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}
