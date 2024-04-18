import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  let navigate = useNavigate();
  console.log(localStorage.getItem('jwt'));
  const authHeader = localStorage.getItem('jwt');
  const { data: wishlist, isLoading } = useQuery({
      queryFn: async () => {
        const response = await axios.get(
          `http://localhost:8080/wishlist/all`, {
            headers: {'Authorization': `${authHeader}`}
        })
        console.log(response.data);
        return (response.data);
      },
      queryKey: ["wishlist"]
  });

      console.log(wishlist);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleClick = (wishlistItemId) => {
      axios.delete(
        `http://localhost:8080/wishlist/delete/${wishlistItemId}`, {
      headers: {'Authorization': `${authHeader}`}
    })
    navigate("/SimpleUserDashboard");
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