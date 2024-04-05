import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
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
  const [count, setCount] = useState(0)
  
    return (
    <>
         
        <div className="App">

          <Router>
                <Routes>
                    <Route
                        exact
                        path="/AddBook"
                        element={<AddBook />}
                    />
                </Routes>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Home />}
                    />
                </Routes>
                <Routes>
                    <Route
                        exact
                        path="BookDetails/:id"
                        element={<BookView />}
                    />
                </Routes>

            </Router>
        </div>
    </>
  )
}