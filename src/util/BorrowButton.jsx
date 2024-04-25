import { React, useState, useEffect } from "react"
import { useQuery } from "react-query";
import axios from "axios";
import { Store } from 'react-notifications-component';
import Button from "@mui/material/Button";
import 'react-notifications-component/dist/theme.css';


const BorrowButton = (bookKey) => {
  const { data: bookList, isLoading } = useQuery({
    queryFn: async () => {
      const response = await axios.get(`http://localhost:8080/api/books/all`)
      return response.data;
    },
    
    queryKey: ["bookList"]
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const bookRecord = bookList.find(book => book.bookKey === bookKey.bookKey && book.available === true)

  const handleBorrow = () => {
    axios.post(
      `http://localhost:8080/api/messages/send`, {
        "recipientId": bookRecord.customerId,
        "content": `I would like to borrow your copy of ${bookRecord.title}, please message me if it is available and we can coordinate the exchange.`
        }, {
        headers: {'Authorization': `${localStorage.getItem('jwt')}`}
    })
    axios.post(
      `http://localhost:8080/api/borrow/checkout`, {
        "bookId": bookRecord.id
      }, {
        headers: {'Authorization': `${localStorage.getItem('jwt')}`}
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

 if (bookRecord && bookRecord.available) {
    return (<Button variant="contained" color="secondary" onClick={handleBorrow}> Borrow </Button>);
  } else {
    return (<Button variant="outlined" disabled>Unavailable</Button>);
  }

}

export default BorrowButton