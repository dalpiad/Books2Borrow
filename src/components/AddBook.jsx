import React, { useEffect } from "react";
import Navigation from "./Navigation";
import { useState } from "react";
import BookDetails from "./BookDetails";
import { useQuery } from "react-query";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import ButtonComp from "./ui/ButtonComp";



const AddBook = () =>{
    const [ isSearching, setIsSearching] = useState(true);
    const [ isClicked, setIsClicked ] = useState(false);
    const [clickedBook, setClickedBook] = useState(null);

    const handleClickTwo = (obj) => {
        setClickedBook(obj);
        setIsClicked(!isClicked);
        setIsSearching(!isSearching);
    };
    const [searchTerm, setSearchTerm] = useState("Of Mice and Men");

  const handleClick = () => {
    setSearchTerm(document.getElementById("outlined-basic").value);
  };


  const { data: books, isLoading } = useQuery({
    queryFn: async () => {
      const response = await axios.get(
        `http://openlibrary.org/search.json?q=${searchTerm}`
      );
      const booksArray = response.data.docs.map(({ author_name, cover_i, first_publish_year, key, ratings_average, ratings_count, subject, title }) => ({
        bookKey: key,
        title: title,
        bookCover: cover_i,
        author: author_name,
        firstPublishYear: first_publish_year,
        averageRating: ratings_average,
        numberOfReviews: ratings_count,
        subject: subject,
        isAvailable: true
      }));
      return booksArray;
    },
    queryKey: ["books", {searchTerm}]
  });

    if(isLoading) {return (
        <>
            <Navigation />
            <br/>
            <form onSubmit={handleClick} style={{ display: "flex", columnGap: '20px', marginLeft: '20px' }}>
            <TextField style={{ flexGrow: 4 }}
              id="outlined-basic"
              label="Search"
              variant="outlined"
            />
            <Button type='submit' variant="contained" onClick={handleClick} style={{ marginLeft: "auto" }}>
              Search
            </Button>
            </form>
            <div>
                <h1>Loading...</h1>
            </div>
      </>
    )
    }

   
    if (isSearching && !isLoading) {
    return (
        < div>
            <Navigation />
            <br/>
            <>
            <form onSubmit={handleClick} style={{ display: "flex", columnGap: '20px', marginLeft: '20px' }}>
            <TextField style={{ flexGrow: 4 }}
              id="outlined-basic"
              label="Search"
              variant="outlined"
            />
            <Button type='submit' variant="contained" onClick={handleClick} style={{ marginLeft: "auto" }}>
              Search
            </Button>
            </form>

      <div className="wrapper">
        <ul className="card-grid">
          {books.map((book, index) => (
              <div className="card" key={index}>                            
                <div className="card-image">
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.bookCover}-M.jpg`}
                      alt={book.title}
                    />
                </div>
                <div className="card-content">
                  <h3 className="card-name">{book.title}</h3>
                </div>
                <ButtonComp handle={() => handleClickTwo(book)} name="View Details" />
              </div>
            ))}
        </ul>
      </div>
    </>
        </div>
    )
    }

    if(isClicked) {
    return(
        <div>
            <Navigation />
            <br/>
            <BookDetails clickedBook={clickedBook} handleClickTwo={handleClickTwo}/>
        </div>
    )
    }
};
export default AddBook;
