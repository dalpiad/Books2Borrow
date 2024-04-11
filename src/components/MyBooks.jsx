import React, { useEffect } from "react";
import Navigation from "./Navigation";
import SearchBox from "./ui/SearchBox";
import { useState } from "react";
import { Link } from "react-router-dom";
import ButtonComp from "./ui/ButtonComp";
import AddBookButton from "./ui/AddBookButton";


const MyBooks = () =>{
    const [books, setBooks] = useState([]);
    console.log(books);
    
    const getBooks = (data) => {
        setBooks(data);
    
    }

    return (
        <>
        <div>
            <Navigation />
            <br/>
            <SearchBox getBooks={getBooks}/>
        </div>
        <div className="wrapper">
              <ul className="card-grid">
                  {books.map((book) => (
                    <div className="card" key={book.bookkey}>
                        <div className="card-image">
                            <Link to={"/MyBooks/book-details/" + books.indexOf(book) + "-" + book.title}>
                                <img src={"https://covers.openlibrary.org/b/id/" + book.bookCover + "-M.jpg"} alt={book.title} />
                            </Link>
                        </div>
                        <div className="card-content">
                            <h3 className="card-name">{book.title}</h3>
                        </div>
                            <Link to={"/MyBooks/book-details/" + books.indexOf(book) + "-" + book.title}>   
                                <ButtonComp name="View Details"/>
                            </Link>
                        
                        <AddBookButton book ={book}/>
                        
                    </div>
                  ))}
              </ul>
            </div>
       </>
    )
}
export default MyBooks;
