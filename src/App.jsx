import './App.css'
import Home from './components/Home'
import AddBook from './components/AddBook'
import MyBooks from './components/MyBooks'
import BookDetails from './components/BookDetails'
import TestPage from './components/TestPage'


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

export default function App() {
  
    return (
    <>
      <Router>
        <div className="App">
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/MyBooks" element={<MyBooks />} />
          <Route path="/AddBook" element={<AddBook />} />
          <Route path="/MyBooks/book-details/:title" element={<BookDetails />}/>
          <Route path="/TestPage" element={<TestPage />}/>
        </Routes>
        </div>
      </Router>
        
    </>
  )
}