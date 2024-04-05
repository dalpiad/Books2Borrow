import React, { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import SearchBar from './SearchBar';
import TextField from "@mui/material/TextField";
import Select from 'react-select';
import { Link } from 'react-router-dom';

function DiplayBooks() {
  const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [books, setBooks] = useState([]);
    const [records, setRecords]=useState(books);
    const [selectedOption, setSelectedOption] = useState(null);
    const Filter= (event)=>{
        setRecords(books.filter(f=>((f.title.toLowerCase().includes(event.target.value.toLowerCase()) ) )
        ||(f.author.toLowerCase().includes(event.target.value.toLowerCase()))
        ||(f.subject.some(genre => genre.toLowerCase().includes(event.target.value.toLowerCase())))
        ))
    }

    const options = [
        { value: 'title', label: 'Title' },
        { value: 'author', label: 'Author' },
        { value: 'subject', label: 'Subject' },
      ];

      

      const Dropdown = () => {
        
        const [searchInputValue, setSearchInputValue] = useState('');
      
        const filteredOptions = options.filter((option) => {
          return option.label.toLowerCase().includes(searchInputValue.toLowerCase());
        });
      
        return (
          <div>
            <Select
              options={options}
              value={selectedOption}
              onChange={(selectedOption) => setSelectedOption(selectedOption)}
              placeholder="Select...."
            />
          </div>
        );
      };
    
      
    useEffect(() => {
        fetch('http://localhost:8080/api/books/home')
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
                <tr>
                <Select
              options={options}
              value={selectedOption}
              onChange={(selectedOption) => setSelectedOption(selectedOption)}
              placeholder="Select an option..."
            />
            <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={Filter}
            style={{
            position: "absolute",
            top: 100,
            left: 179,
            right: 350,
            }}
            />
            </tr>
            <div className="card-grid">
                {records.map((book) => (
                    
                        <div className="card" key={book.bookKey}>
                      
                            <div className="card-image">
                            <Link to ={`/BookDetails/${book.id}`}> 
                                <img src={"https://covers.openlibrary.org/b/id/" + book.bookCover + "-M.jpg"} alt={book.title} />
                                </Link>
                            </div>
                            <div className="card-content">
                                <h3 className="card-name">{book.title}</h3>
                            </div>
                          
                           
                        </div>
                  
                    
                ))}
            </div>
          </div>
        );
    }
}

export default DiplayBooks;
