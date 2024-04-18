import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

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


  const handleClick = (wishlistItemId) => {
      axios.delete(
        `http://localhost:8080/wishlist/delete/${wishlistItemId}`, {
      headers: {'Authorization': `${authHeader}`}
    })
  }
    
    return (
      <>
        <table className="myWishlistTableTr" style={{ width: "90%" }}>
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
                <td className="myWishlistTableTd" >Borrow</td>
                <td className="myWishlistTableTd">
                  <Button variant="outlined" color="error" onClick={() => handleClick(wishlistItem.id)}> Delete </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
};

        
export default Wishlist;