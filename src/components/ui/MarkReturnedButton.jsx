import React from "react"
import axios from "axios";

const MarkReturnedButton = (props) => {
    const handleClick = () => {
    confirm(`Mark book ${props.id} as returned? This will close the checkout record`);
    const data = props.id;
    
    const token = localStorage.getItem('jwt');
    axios.post(`http://localhost:8080/api/borrow/return`, data, {headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }}).then(response => {
        if (response.status === 200) {
            alert("Book Returned");
        } else {
            alert("Error returning book")
        }
        }).catch(error => {
            console.error("Error returning book", error);
        }) 
        }
        return (
            <div className="containerBookReturnedButton">
                <button className="bookReturnedtButton" onClick={handleClick}> Mark Returned </button>
            </div>
        
    )
}

export default MarkReturnedButton;