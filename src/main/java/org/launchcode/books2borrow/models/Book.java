package org.launchcode.books2borrow.models;

import jakarta.persistence.Entity;

import java.util.ArrayList;



@Entity
public class Book extends AbstractEntity {

    private String bookKey;
    private String title;
    private int bookCover;
    private ArrayList<String> author;
    private int firstPublishYear;
    private double averageRating;
    private int numberOfReviews;
    private ArrayList<String> subject;
    private boolean isAvailable;



    public Book(String bookKey, String title, int bookCover, ArrayList<String> author, int firstPublishYear,
                double averageRating, int numberOfReviews, ArrayList<String> subject, boolean isAvailable) {
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

    public int getBookCover() {
        return bookCover;
    }

    public void setBookCover(int bookCover) {
        this.bookCover = bookCover;
    }

    public ArrayList<String> getAuthor() {
        return author;
    }

    public void setAuthor(ArrayList<String> author) {
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

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}
