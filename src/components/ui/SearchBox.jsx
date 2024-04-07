import React from "react";
import { useState } from "react";
import FetchComp from "./Fetch";
import Button from "./Button";


const SearchBox = ()=>{
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, SetSearchResults] = useState([]);

    const handleSearch = (searchTerm) => {
        const apiURL = `http://openlibrary.org/search.json?q=${searcchTerm}`;
    
        setSearchTerm(searchTerm);
        SetSearchResults([]);
    };

    const handleClick = () => {
        setSearchTerm(document.getElementById("outlined-basic").value);
      };

    const fetchedData = (data) => {
        SetSearchResults(data);
    }

    return (
        <div>
            <input
                id="outlined-basic"
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <Button onClick={handleClick}/>
            <FetchComp url={apiURL} fetchedData={fetchedData}/>
            
        </div>
    )

};

export default SearchBox;


