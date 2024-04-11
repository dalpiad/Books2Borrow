import React, { useState } from "react";
import Navigation from "./Navigation";
import { useParams } from "react-router-dom";

const BookDetails = (props) => {
const { title: bookTitle } = useParams();
//bookTitle returns the whole paramater as a String
const bookId = parseInt(bookTitle.charAt(0), 10);
//bookID is the int id of the book selected. 
console.log(props.book);



    return(
        <>
            <Navigation />
            <div>Index</div>
        </>
    
    )
}

export default BookDetails;