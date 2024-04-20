import React, { useEffect, useState } from 'react';

function TestingComponent() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const jwt = localStorage.getItem('jwt'); // Retrieve the JWT from local storage
    if (jwt) {
      fetch('http://localhost:8080/testing', {
        method: 'GET',
        headers: {
          'Authorization': `${jwt}`, // Set the Authorization header with the JWT
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Handle as text since the response is plain text
      })
      .then(text => {
        setMessage(text); // Set the message to display as the successful response
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('INVALID JWT'); // Set error message if the fetch fails
      });
    } else {
      console.log("No JWT found in local storage.");
      setMessage('INVALID JWT'); // Set error message if no JWT is found
    }
  }, []);

  return (
    <div>
      <h1>{message}</h1> {/* Display the message or error */}
    </div>
  );
}

export default TestingComponent;