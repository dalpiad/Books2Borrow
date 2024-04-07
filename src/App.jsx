import './App.css'
import Home from './components/Home'
import AddBook from './components/AddBook'
import BookView from './components/BookView'
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
          <Route exact path="AddBook" element={<AddBook />} />
          <Route exact path="BookDetails/:id" element={<BookView />} />
        </Routes>
        </div>
      </Router>
    </>
  )
}