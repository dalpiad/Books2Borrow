import React, { useState } from "react";
import AddBookButton from "./ui/AddBookButton";


const BookDetails = (clickedBook) => {
   const book = clickedBook.clickedBook;

   // need to add a function to take the prop from clickedBook and check for undefined. If undefined, need to assign a default value. 
   console.log(book);
    return(
        <>
            <div>
            <div className="book-details">
                            <div >
                           
                                <img src={"https://covers.openlibrary.org/b/id/" + book.bookCover + "-M.jpg"} alt={book.title} />
                            </div>

                            <div >
                             <div className="book-content">
                             <h3>Title :  </h3> 
                            <p> {book.title}</p>
                            </div>
                            <div className="book-content">
                            <h3>Author :  </h3> 
                            <p>{book.author}</p>
                            </div>
                            <div className="book-content">
                            <h3>FirstPublishYear :</h3> 
                            <p>{book.firstPublishYear}</p>
                            </div>
                            <div className="book-content">
                            <h3>AverageRating :</h3> 
                            <p>{book.averageRating}</p>
                            </div>
                            <div className="book-content">
                            <h3>NumberOfReviews :</h3> 
                            <p>{book.numberOfReviews}</p>
                            </div>
                            </div>
                            </div>
                            <div className="book-details">
                            <button className = "second-btn">Add to Wishlist </button>
                            <AddBookButton book={book}/>
                            </div>
                           
          </div>
        </>
    
    )
}

export default BookDetails;