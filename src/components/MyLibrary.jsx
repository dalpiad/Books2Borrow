import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import DeleteBookButton from "./ui/DeleteBookButton";


const MyLibrary = () => {
    const [selectedId, setSelectedId] = useState(null);
    const { data: myBooks, isLoading } = useQuery({
        queryFn: async () => {
          const response = await axios.get(
            `http://localhost:8080/api/books/delete`
          )
          console.log(response.data);
          return response.data;
        },
        queryKey: ["myBooks"]
      });

      console.log(myBooks);

    const handleToggle = () => {
      // will need to update to it's own component later


    }

    const handleSelected = (id) => {
      setSelectedId(id);
    }


      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      return (
        <>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>isAvailable</th>
              <th>Book ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
              <th>Rating</th>
              <th>Reviews</th>
              <th>Genres</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {myBooks?.map((book) => (
              <tr key={book.id}>
                <td>
                <td>
                  <label>
                  <input type="checkbox" checked={book.available} />
                </label>
                </td>
                </td>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.firstPublishYear}</td>
                <td>{book.averageRating}</td>
                <td>{book.numberOfReviews}</td>
                <td>{book.subject}</td>
                <td>
                  <label>
                  <input type="checkbox" onChange={()=>{handleSelected(book.id)}} />
                </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <DeleteBookButton id={selectedId} />
        </>
      );
    };
    
    export default MyLibrary;
