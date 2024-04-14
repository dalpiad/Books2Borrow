import React from "react"
import axios from "axios";
import ButtonComp from "./ButtonComp";

const AddBookButton = (props) => {
    const handleClick = () => {
        alert("You clicked me!");
        const data = props.book;
        console.log(data);

    const username = 'zim@test.com';
    const password = '12345';
    const encodedCredentials = btoa(`${username}:${password}`);

    // const config = {
    //     headers: {
    //         'Authorization': `Basic ${encodedCredentials}`
    //     }
    // };


    axios.post('http://localhost:8080/api/books/add', data, {headers: {
        'Content-Type': 'application/json'
      }}).then(response => {
        if (response.ok) {
            alert('Successfully Added to "My Books."');
        } else {
            alert("error adding book.")
        }
        }).catch(error => {
            console.error("Error sending book", error);
        }) 
        }
        return (
            <div className="BooksButton">
                <button onClick={handleClick}> Add Book</button>
            </div>
        
    )
}

export default AddBookButton;