import React from "react"

const AddBookButton = (props) => {
    const handleClick = () => {
        alert("You clicked me!");
        const data = props.book;
        console.log("this is data!");
        console.log(data);
        console.log("This is props!");
        console.log(props);

        fetch('http://localhost:8080/api/books/add', {
            method: "POST",
            headers: {
                "Content-Type" : "application/JSON"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert("Successfully Added!")
            } else {
                alert("Error adding book.")
            }
        })
        .catch(error => {
            console.error("Error sending book", error)
        });
    }
    return (
        <div className="BooksButton">
            <button onClick={handleClick}> Add Book</button>
        </div>
        
    )
}

export default AddBookButton;