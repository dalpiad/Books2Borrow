import './App.css'
import Home from './components/Home'
import AddBook from './components/AddBook'
import BookView from './components/BookView'
import Register from './components/Register'
import Testing from './components/Testing'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from './components/Login'

export default function App() {
  
    return (
    <>
      <Router>
        <div className="App">
        <Routes >
          <Route exact path="/" element={<Home />} />
          <Route exact path="AddBook" element={<AddBook />} />
          <Route exact path="BookDetails/:id" element={<BookView />} />
          <Route exact path="Register" element={<Register />} />
          <Route exact path="Login" element={<Login />} />
          <Route exact path="Testing" element={<Testing />} />

        </Routes>
        </div>
      </Router>
    </>
  )
}