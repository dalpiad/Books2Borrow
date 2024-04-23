import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from './Navigation';
import Button from "@mui/material/Button";

function BookView() {
    const authHeader = localStorage.getItem('jwt');
    const {id} = useParams();
    const [book , setBook] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [wishlist, setWishlist]= useState([]);
    const [bookList, setBookList]= useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/books/'+id)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setBook(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    if (error) {
        return <>{error.message}</>;
    } else if (!isLoaded) {
        return <>loading...</>;
    } else {
        return (
          
            /* here we map over the element and display each item as a card  */
            <div >
               <Navigation/>
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
                            <button className = "third-btn">Add Books </button>
                            <section>
                                {(() => {
                                    const bookRecord = bookList.find(book => book.bookKey === wishlistItem.bookKey && book.available === true)
                                    if (bookRecord && bookRecord.available) {
                                    return (<Button variant="contained" color="secondary" onClick={() => handleBorrow(bookRecord)}> Borrow </Button>);
                                } else {
                                    return (<Button variant="outlined" disabled>Unavailable</Button>);
                                }})()}
                                </section>
                            <button className= "fourth-btn"> Borrow Book</button>
                            </div>
                           
          </div>
        );
    }
}


export default BookView