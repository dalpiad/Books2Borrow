import { React, useState, useEffect } from "react"
import { useQuery } from "react-query";
import Switch from '@mui/material/Switch';
import axios from "axios";


const AvailableToggle = (book) => {
    const [checked, setChecked] = useState(true);
    const { data: checkedOutbooks, isLoading } = useQuery({
        queryFn: async () => {
          const response = await axios.get(
            `http://localhost:8080/api/borrow/lent`, {
              headers: {'Authorization': `${localStorage.getItem('jwt')}`}
            });
          return response.data;
        },
        
        queryKey: ["checkedOutbooks"]
      });


      if (isLoading) {
        return <div>Loading...</div>;
      }

      const handleChange = (event) => {
        setChecked(event.target.checked);
      };


    if (book.book.available === true) {
        handleChange;
    }

    let bookStatus = null;
    if (checkedOutbooks != null) {
        bookStatus = checkedOutbooks.find(checkedOutBook => checkedOutBook.bookId === book.book.id && checkedOutBook.checkedout === true);
    }


    const handleToggle = () => {
        if (book.book.available === true) {
        // axios.post(
        //     `http://localhost:8080/api/books/available`, {
        //       "id": book.book.id,
        //       "isAvailable": false }, {
        //       headers: {'Authorization': `${localStorage.getItem('jwt')}`}
        //   }
        // )
        } else {
        // axios.post(
        //     `http://localhost:8080/api/books/available`, {
        //       "id": book.book.id,
        //       "isAvailable": true }, {
        //       headers: {'Authorization': `${localStorage.getItem('jwt')}`}
        //   }
        // )
        }
    };


    if (book.book.available === true && bookStatus == null) {
        return (<Switch checked={checked} onChange={handleToggle} />);
    } else if (book.book.available === false && bookStatus == null) {
        return (<Switch checked={checked} onChange={handleToggle} />);
    } else {
        return (<Switch disabled />)
    }
}

export default AvailableToggle