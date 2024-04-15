import React from "react"
import axios from "axios";

const DeleteCheckoutButton = (props) => {
    const handleClick = () => {
        alert(`Request Sent! Chekcout ID ${props.id} will be deleted`);
        const data = props.id;

    // update path to send delete request to Checkout Controller once ready. 
    axios.delete(`http://localhost:8080/${data}`).then(response => {
        if (response.OK) {
            alert("Book Returned");
        } else {
            alert("Error returning book")
        }
        }).catch(error => {
            console.error("Error returning book", error);
        }) 
        }
        return (
            <div className="containerDeleteCheckoutButton">
                <button className="deleteCheckoutButton" onClick={handleClick}> Mark Returned </button>
            </div>
        
    )
}

export default DeleteCheckoutButton;