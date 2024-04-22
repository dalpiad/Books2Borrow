import { React, useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const Wishlist = () => {
  const authHeader = localStorage.getItem('jwt');
  const [wishlist, setWishlist]= useState([]);
  const [bookList, setBookList]= useState([]);

  useEffect(() => {
      async function fetchData() {
        const response = await axios.get(
        `http://localhost:8080/wishlist/all`, {
          headers: {'Authorization': `${authHeader}`}
      })
      setWishlist(response.data);
    };
    fetchData();
  },[]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
      `http://localhost:8080/api/books/all`)
    setBookList(response.data);
  };
  fetchData();
},[]);


  const handleBorrow = (bookRecord) => {
    axios.post(
    `http://localhost:8080/api/messages/send`, {
      "recipientId": bookRecord.customerId,
      "content": `I would like to borrow your copy of ${bookRecord.title}, please message me if it is available and we can coordinate the exchange.`
    }, {
      headers: {'Authorization': `${authHeader}`}
    })
    .then (handleNotification( `${bookRecord.title} request is sent.` ));
  };

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


  const handleClick = (wishlistItemId) => {
      axios.delete(
        `http://localhost:8080/wishlist/delete/${wishlistItemId}`, {
      headers: {'Authorization': `${authHeader}`}
    })
  }
    
    return (
      <>
        <ReactNotifications />
        <table  style={{ width: "100%", backgroundColor: "LightGray" }}>
          <thead className="myWishlistTable">
            <tr className="myWishlistTableTr">
              <th></th>  
              <th> Title </th>  
              <th> Borrow </th>
              <th> Delete </th>
            </tr>
          </thead >
          <tbody className="myWishlistTable">
            {wishlist.map((wishlistItem) => (
              <tr className="myWishlistTableTr" key={wishlistItem.id}>
                <td className="myWishlistTableTd" >
                    <img className="bookCoverSmall" src={"https://covers.openlibrary.org/b/id/" + wishlistItem.bookCover + "-S.jpg"} alt="Book Cover" height="58" />
                </td>
                <td className="myWishlistTableTd" >{wishlistItem.title}</td>
                <td>
                  <section>
                  {(() => {
                    const bookRecord = bookList.find(book => book.bookKey === wishlistItem.bookKey && book.available === true)
                    if (bookRecord && bookRecord.available) {
                      return (<Button variant="contained" color="secondary" onClick={() => handleBorrow(bookRecord)}> Borrow </Button>);
                  } else {
                    return (<Button variant="outlined" disabled>Unavailable</Button>);
                  }})()}
                  </section>
                </td>
                <td>
                  <Button variant="contained" color="error" onClick={() => handleClick(wishlistItem.id)} startIcon={<DeleteIcon />}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
};

export default Wishlist;