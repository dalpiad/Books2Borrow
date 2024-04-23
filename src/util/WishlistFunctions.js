import axios from "axios";
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


export default function handleAddToWishlist(book) {
    const authHeader = localStorage.getItem('jwt');
    const bookData = {bookKey : book.bookKey, title : book.title, bookCover : book.bookCover }
    axios.post(
      `http://localhost:8080/wishlist/addToWishlist`, 
      bookData, 
      {
        headers: {'Authorization': `${authHeader}`}
      }
    )
    .then (handleNotification( `${book.title} added to your wishlist` ));
  }

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

