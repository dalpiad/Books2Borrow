import { React, useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';

const Wishlist = () => {
  const authHeader = localStorage.getItem('jwt');
  const [wishlist, setWishlist]= useState([]);

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

  const handleBorrow = (wishlistItem) => {
    axios.post(
    `http://localhost:8080/api/messages/send`, {
      "recipientId": wishlist.customerId,
      "content": `I would like to borrow your copy of ${wishilist.title}, please message me if it is available and we can coordinate the exchange.`
    }, {
      headers: {'Authorization': `${authHeader}`}
    })
    .then (handleNotification( `${book.title} added to your wishlist` ));
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
                  <Button variant="contained" color="secondary" onClick={() => handleBorrow(wishlistItem)}> Borrow </Button>
                </td>
                <td>
                  <Button variant="contained" color="error" onClick={() => handleClick(wishlistItem.id)} startIcon={<DeleteIcon />}> Delete </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
};

export default Wishlist;