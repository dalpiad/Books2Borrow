import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import BorrowButton from '../util/BorrowButton';

const Wishlist = () => {
  const { data: wishlist, isLoading, refetch } = useQuery({
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8080/wishlist/all`, {
          headers: {'Authorization': `${localStorage.getItem('jwt')}`}
        })
      return response.data;
    },
    queryKey: ["wishlist"]
  });

  const handleClick = async (wishlistItem) => {
      if (confirm(`You are about to delete ${wishlistItem.title}`)) {
          await axios.delete(
            `http://localhost:8080/wishlist/delete/${wishlistItem.id}`, {
          headers: {'Authorization': `${localStorage.getItem('jwt')}`}
        })
        await refetch();
      } 
    }


    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <table style={{ width: "100%", backgroundColor: "LightGray" }}>
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
                  <BorrowButton bookKey={wishlistItem.bookKey} />
                </td>
                <td>
                  <Button variant="contained" color="error" onClick={() => handleClick(wishlistItem)} startIcon={<DeleteIcon />}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
};

export default Wishlist;