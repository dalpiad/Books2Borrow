import React from "react"
import axios from "axios";
import { Store } from 'react-notifications-component';
import Button from "@mui/material/Button";
import 'react-notifications-component/dist/theme.css';


const AddWishlistButton = (book) => {
    console.log(book);
    const handleNotification = (message) => {
      Store.addNotification({
        title: 'Success!',
        message: message,
        type: 'success',
        insert: 'top',
        container: 'top-right',
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
    }


    const handleAddToWishlist = () => {
      const bookData = {bookKey : book.book.bookKey, title : book.book.title, bookCover : book.book.bookCover }
      axios.post(
        `http://localhost:8080/wishlist/addToWishlist`, 
        bookData, 
        {
          headers: {'Authorization': `${localStorage.getItem('jwt')}`}
        }
      )
      .then (handleNotification( `${book.book.title} added to your wishlist` ));
  }
  
  return (
    <Button id="wishlist-button" variant='contained' color='success' onClick={handleAddToWishlist}>Add to Wishlist</Button>
  );

}

export default AddWishlistButton

