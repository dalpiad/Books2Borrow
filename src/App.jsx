import './App.css'
import Home from './components/Home'
import AddBook from './components/AddBook'
import BookView from './components/BookView'
import SimpleUserDashboard from './components/SimpleUserDashboard'
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
          <Route exact path="/" element={<Home />} />
          <Route path="/MyBooks" element={<MyBooks />} />
          <Route exact path="AddBook" element={<AddBook />} />
          <Route exact path="BookDetails/:id" element={<BookView />} />
          <Route exact path="SimpleUserDashboard" element={<SimpleUserDashboard />} />
          <Route path="/MyBooks/book-details/:title" element={<BookDetails />}/>
          <Route path="/TestPage" element={<TestPage />}/>
        </Routes>
        </div>
      </Router>
    </>
  )
}