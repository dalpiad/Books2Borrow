import React from "react"
import axios from "axios";

const DeleteBookButton = (props) => {
    const handleClick = () => {
        alert(`Request Sent! Book with ${props.id} will be deleted`);
        const data = props.id;
    
        const token = localStorage.getItem('jwt');
    axios.delete(`http://localhost:8080/api/books/delete/${data}`, {headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`}}).then(response => {
        if (response.OK) {
            alert("Book Deleted");
        } else {
            alert("Error removing book")
        }
        }).catch(error => {
            console.error("Error sending book", error);
        }) 
        }
        return (
            <div className="containerDeleteButton">
                <button className="DeleteButton" onClick={handleClick}> Delete </button>
            </div>
        
    )
}

export default DeleteBookButton;