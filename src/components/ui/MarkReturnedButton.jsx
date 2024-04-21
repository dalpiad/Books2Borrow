import React from "react"
import axios from "axios";

const MarkReturnedButton = (props) => {
    const handleClick = () => {
        confirm(`Mark book ${props.id} as returned? This will close the checkout record`);
        const data = props.id;

    // update path to send delete request to Checkout Controller once ready. 
    axios.patch(`http://localhost:8080/${data}`).then(response => {
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