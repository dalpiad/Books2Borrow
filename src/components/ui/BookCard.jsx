import React, { useState, useEffect } from "react";
import axios from "axios";

const BookCard = ({ bookId }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [onLoad, setOnLoad] = useState(false);
  const [aBook, setABook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    setSelectedId(bookId);
  }, [bookId]);

  useEffect(() => {
    if (selectedId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/books/${selectedId}`,
            {
              headers: {
                'Authorization': `${token}`
              }
            }
          );
          setABook(response.data);
          setIsLoading(false);
          setOnLoad(true);
        } catch (error) {
          console.error("Error fetching book data:", error);
        }
      };
      fetchData();
    }
  }, [selectedId, token]);

  return (
    <div>
      {onLoad ? (
        isLoading ? (
          <div>Loading...</div>
        ) : (
        <div className="statusBookCard">
          <div className="wrapper">
            <ul className="card-grid">
              <div className="card">
                <div className="card-image">
                  <img
                    src={`https://covers.openlibrary.org/b/id/${aBook.bookCover}-M.jpg`}
                    alt={aBook.title}
                  />
                </div>
                <div className="card-content">
                  <h3 className="card-name">{aBook.title}</h3>
                </div>
              </div>
            </ul>
          </div>
          </div>
        )
      ) : (
        <div>No book selected</div>
      )}
    </div>
  );
};

export default BookCard;
