import axios from "axios";
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


export default function handleBorrow(bookRecord) {
    const authHeader = localStorage.getItem('jwt');
    axios.post(
    `http://localhost:8080/api/messages/send`, {
      "recipientId": bookRecord.customerId,
      "content": `I would like to borrow your copy of ${bookRecord.title}, please message me if it is available and we can coordinate the exchange.`
      }, {
      headers: {'Authorization': `${authHeader}`}
    })
    axios.post(
      `http://localhost:8080/api/borrow/checkout`, {
        "bookId": 2
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