import React from "react";
import { useState } from "react";
import { useEffect } from "react";



const FetchComponent = ({searchTerm, fetchedData})=>{
    const [error, setError] = useState();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://openlibrary.org/search.json?q=${searchTerm}`);
                const jsonData = await response.json();

                const booksArray = jsonData.docs.map(({author_name, cover_i, first_publish_year, key, ratings_average, ratings_count, subject, title }) => ({
                    bookKey: key,
                    title: title,
                    bookCover: cover_i,
                    author: author_name,
                    firstPublishYear: first_publish_year,
                    averageRating: ratings_average,
                    numberOfReviews: ratings_count,
                    subject,
                    isAvailable: true
                }));

                setData(booksArray);
                fetchedData(booksArray);
                setIsLoading(false);
            }
            catch (e) {
                setError(e);

            }
            finally {
                setIsLoading(false);
            }
        };
        fetchData();

        }, [searchTerm])
    

    if(isLoading) {
        return( <div>
                    <h1>Loading...</h1>
                </div>)
    }

    if (error) {
        return(
                <div>
                    <p>Something went wrong! Please try again.</p>
                    
                </div>)
    }
};

export default FetchComponent;