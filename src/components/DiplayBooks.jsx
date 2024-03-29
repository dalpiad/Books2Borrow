import React, { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import SearchBar from './SearchBar';
import TextField from "@mui/material/TextField";

function DiplayBooks() {
  const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [books, setBooks] = useState([]);
    const [records, setRecords]=useState(books);
    const Filter= (event)=>{
        setRecords(books.filter(f=>(f.title.toLowerCase().includes(event.target.value.toLowerCase()) 
        ||(f.author.toLowerCase().includes(event.target.value.toLowerCase()) ) )))
    }
    
      
    useEffect(() => {
        fetch('http://localhost:8080/Home')
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setBooks(result);
                    setRecords(result);
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
            <div className="wrapper">
            <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={Filter}
            style={{
            position: "absolute",
            top: 100,
            left: 100,
            right: 350,
            }}
            />
            <ul className="card-grid">
                {records.map((book) => (
                    <li>
                        <article className="card" key={book.bookKey}>
                            <div className="card-image">

                                <img src={"https://covers.openlibrary.org/b/id/" + book.bookCover + "-M.jpg"} alt={book.title} />
                            </div>
                            <div className="card-content">
                                <h2 className="card-name">{book.title}</h2>
                            </div>
                        </article>
                    </li>
                    
                ))}
            </ul>
          </div>
        );
    }
}

export default DiplayBooks;
