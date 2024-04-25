import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import DeleteBookButton from "./ui/DeleteBookButton";
import AvailableToggle from "../util/AvailableToggle";


const MyLibrary = () => {
  const token = localStorage.getItem('jwt');

    const [selectedId, setSelectedId] = useState(null);
    const { data: myBooks, isLoading } = useQuery({
        queryFn: async () => {
          const response = await axios.get(
            `http://localhost:8080/api/books/delete`, {headers: {
              'Authorization': `${token}`
        }})
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
        <table className="myBooksTable" style={{ width: "100%" }}>
          <thead className="myBooksTable">
            <tr className="myBooksTable">
              <th className="myBooksTable" id="myBooksTableAvailable">Available to Lend</th>
              {/* <th className="myBooksTable">Book ID</th> */}
              <th className="myBooksTable" id="myBooksTableTitle" >Title</th>
              <th className="myBooksTable">Author</th>
              <th className="myBooksTable">Published</th>
              <th className="myBooksTable">Rating</th>
              <th className="myBooksTable">Reviews</th>
              <th className="myBooksTable">Genres</th>
              <th className="myBooksTable">Delete</th>
            </tr>
          </thead >
          <tbody className="myBooksTable">
            {myBooks?.map((book) => (
              <tr className="myBooksTable" id="myBooksTableRow" key={book.id}>
                <td className="myBooksTable">
                  <label>
                  <AvailableToggle book={book} />
                </label>
                </td>
                {/* <td className="myBooksTable">{book.id}</td> */}
                <td className="myBooksTable" >{book.title}</td>
                <td className="myBooksTable">{book.author}</td>
                <td className="myBooksTable">{book.firstPublishYear}</td>
                <td className="myBooksTable">{book.averageRating}</td>
                <td className="myBooksTable">{book.numberOfReviews}</td>
                <td className="myBooksTable">{book.subject}</td>
                <td className="myBooksTable">
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