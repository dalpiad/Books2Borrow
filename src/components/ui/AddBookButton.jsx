import React from "react"
import axios from "axios";

const AddBookButton = (props) => {
    const handleClick = () => {
        const data = props.book;

    const token = localStorage.getItem('jwt');

    axios.post('http://localhost:8080/api/books/add', data, {headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }}).then(response => {
        if (response.status === 200) {
            alert('Successfully Added to "My Books."');
        } else {
            alert("error adding book.")
        }
        }).catch(error => {
            console.error("Error sending book", error);
        }) 
        }
        return (
            <div>
                <button className="BooksButton" onClick={handleClick}> Add Book</button>
            </div>
        
    )
}

export default AddBookButton;