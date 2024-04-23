import React, { useState } from "react";
import AddBookButton from "./ui/AddBookButton";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import handleAddToWishlist from '../util/WishlistFunctions';
import Button from "@mui/material/Button";

const BookDetails = (clickedBook) => {

   let navigate = useNavigate();
   const authHeader = localStorage.getItem('jwt');
   console.log(authHeader);
   
   const book = clickedBook.clickedBook;

    function processCleanBook(book) {
        const defaultValues = {
            bookKey: "Not Available",
            title: "Not Available",
            bookCover: 0,
            author: "Not Available",
            firstPublishYear: 0,
            averageRating: 0,
            numberOfReviews: 0,
            subject: ["Not Available"],
            isAvailable: true
        };
      
        for (const key in defaultValues) {
            if (typeof book[key] === "undefined" || book[key] === null) {
                book[key] = defaultValues[key];
            } else if (Array.isArray(book[key]) && book[key].length > 10) {
            book[key] = book[key].slice(0, 5);
            }
        }
        return book;
      }
    
   const cleanBook = processCleanBook(book);
   console.log(book);
   console.log(cleanBook);
    return(
        <>
            <div>
                <ReactNotifications />
            <div className="book-details">
                            <div >
                           
                                <img src={"https://covers.openlibrary.org/b/id/" + cleanBook.bookCover + "-M.jpg"} alt={cleanBook.title} />
                            </div>

                            <div >
                             <div className="book-content">
                             <h3>Title :  </h3> 
                            <p> {cleanBook.title}</p>
                            </div>
                            <div className="book-content">
                            <h3>Author :  </h3> 
                            <p>{cleanBook.author}</p>
                            </div>
                            <div className="book-content">
                            <h3>FirstPublishYear :</h3> 
                            <p>{cleanBook.firstPublishYear}</p>
                            </div>
                            <div className="book-content">
                            <h3>AverageRating :</h3> 
                            <p>{cleanBook.averageRating}</p>
                            </div>
                            <div className="book-content">
                            <h3>NumberOfReviews :</h3> 
                            <p>{cleanBook.numberOfReviews}</p>
                            </div>
                            </div>
                            </div>
                            <div className="book-details">
                            <AddBookButton book={cleanBook}/>
                            <Button id="wishlist-button" variant='contained' color='success'onClick={() => handleAddToWishlist(book)}>Add to Wishlist</Button>
                            </div>
          </div>
        </>
    
    )
}

export default BookDetails;