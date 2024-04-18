import React from 'react'
import Navigation from './Navigation'
import SearchBar from './SearchBar'
import DiplayBooks from './DiplayBooks'

const Home = ( ) => {
  console.log(localStorage.getItem('jwt'));
  return (
    <div>
        <Navigation />
       
        <DiplayBooks/>
    </div>

  )
}

export default Home