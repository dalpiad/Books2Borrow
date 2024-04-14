import React, { useState } from "react";
import { useQuery } from "react-query";
import ButtonComp from "./ButtonComp";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const SearchBox = (handleClickTwo) => {
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
        subject,
        isAvailable: true
      }));
      return booksArray;
    },
    queryKey: ["books", {searchTerm}]
  });


  if (isLoading) {
    return (
      <>
        <div>
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              style={{
                  position: "absolute",
                  top: 100,
                  left: 100,
                  right: 350,
                  }}
            />
          </div>
          <div>
            <Button variant="contained" onClick={handleClick} style={{
                  position: "right",
                  top: 10,
                  left: 1210,
                  right: 250,
                  }}>
              Search
            </Button>
          </div>
        <div>
          <h1>Loading...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              style={{
                  position: "absolute",
                  top: 100,
                  left: 100,
                  right: 350,
                  }}
            />
          </div>
          <div>
            <Button variant="contained" onClick={handleClick} style={{
                  position: "right",
                  top: 10,
                  left: 1210,
                  right: 250,
                  }}>
              Search
            </Button>
          </div>

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
                <ButtonComp handle={() => handleClickTwo.handleClickTwo(book)} name="View Details" />
              </div>
            ))}
        </ul>
      </div>
    </>
  );
};

export default SearchBox;
