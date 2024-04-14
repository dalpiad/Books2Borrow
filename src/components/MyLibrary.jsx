import React from "react";

const MyLibrary = () => {
    const { data: myBooks, isLoading } = useQuery({
        queryFn: async () => {
          const response = await axios.get(
            `http://openlibrary.org/search.json?q=${searchTerm}`
          );
          const booksArray = response.data.docs.map(({ author_name, cover_i, first_publish_year, key, ratings_average, ratings_count, subject, title }) => ({
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
          return booksArray;
        },
        queryKey: ["books", {searchTerm}]
      });






    return(
        <div>
            My Library!
        </div>
    );
}

export default MyLibrary;
