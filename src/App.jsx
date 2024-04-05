import './App.css'
import Home from './components/Home'
import AddBook from './components/AddBook'
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
          <Route path="/AddBook" element={<AddBook />} />
        </Routes>
        </div>
      </Router>
        
    </>
  )
}