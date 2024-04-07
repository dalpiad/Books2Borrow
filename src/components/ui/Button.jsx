import React from "react";


const Button = ()=> {
    const handleClick = () => {
        alert("You clicked me!");
    }
    return (
        <div className="BooksButton">
            <Button onClick={this.handleClick}> {this.props.children} Add Book</Button>
        </div>
        
    )
}