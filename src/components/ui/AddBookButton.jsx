import React from "react"

const addBookButton = () => {
    const handleClick = () => {
        alert("You clicked me!");
        const {data} = this.props;

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
            <Button onClick={this.handleClick}> {this.props.children} Add Book</Button>
        </div>
        
    )
}

export default addBookButton;