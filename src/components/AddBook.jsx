import React, { useEffect } from "react";
import Navigation from "./Navigation";
import SearchBox from "./ui/SearchBox";
import { useState } from "react";
import { Link } from "react-router-dom";
import ButtonComp from "./ui/ButtonComp";
import AddBookButton from "./ui/AddBookButton";
import BookDetails from "./BookDetails";


const AddBook = () =>{
    const [ isSearching, setIsSearching] = useState(true);
    const [ isClicked, setIsClicked ] = useState(false);
    const [clickedBook, setClickedBook] = useState(null);

  // Define a click handler function
  const handleClickTwo = (obj) => {
    setClickedBook(obj);
    setIsClicked(true);
    setIsSearching(false);
  };
   
    if (isSearching) {
    return (
        < div>
            <Navigation />
            <br/>
            <SearchBox handleClickTwo ={handleClickTwo} />
        </div>
    )
    }



    if(isClicked) {
    return(
        <div>
            <Navigation />
            <br/>
            <BookDetails clickedBook={clickedBook}/>
        </div>
    )
    }
};
export default AddBook;
