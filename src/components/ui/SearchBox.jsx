import React from "react";
import { useState, useEffect } from "react";
import ButtonComp from "./ButtonComp";
import FetchComponent from "./FetchComponent";



const SearchBox = ({getBooks})=>{
    const [searchTerm, setSearchTerm] = useState();
    const [searchResults, SetSearchResults] = useState([]);

   
    const fetchedData = (data) => {
        SetSearchResults(data);
    }

    const handleClick = () => {
        setSearchTerm(document.getElementById("outlined-basic").value);
      };

      useEffect(() => {
        getBooks(searchResults);
      }, [searchResults]);

    return (
        <div>
            <div>
            <input
                id="outlined-basic"
                type="text"
                label="Search"
                style={{
                    color: "black",
                    backgroundColor: "white",
                    position: "absolute",
                    top: 100,
                    left: 100,
                    right: 350,
                    }}
            />
            <ButtonComp handle={handleClick} name="Search"/>
            </div>
            <div>
            <FetchComponent searchTerm={searchTerm} fetchedData={fetchedData} />
            </div>
        </div>
    )

};

export default SearchBox;


