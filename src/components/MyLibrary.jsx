import React from "react";
import { useQuery } from "react-query";
import axios from "axios";



const MyLibrary = () => {
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


      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      return (
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Select</th>
              <th>isAvailable</th>
              <th>Book ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
              <th>Rating</th>
              <th>Reviews</th>
              <th>Genres</th>
            </tr>
          </thead>
          <tbody>
            {myBooks?.map((book) => (
              <tr key={book.id}>
                <td></td>
                <td>{book.available ? "true" : "false"}</td>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.firstPublishYear}</td>
                <td>{book.averageRating}</td>
                <td>{book.numberOfReviews}</td>
                <td>{book.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    };
    
    export default MyLibrary;
