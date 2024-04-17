import './App.css'
import Home from './components/Home'
import BookView from './components/BookView'
import Register from './components/Register'
import Testing from './components/Testing'
import SimpleUserDashboard from './components/SimpleUserDashboard'
import AddBook from './components/AddBook'
import BookDetails from './components/BookDetails'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from './components/Login'


const queryClient = new QueryClient();

export default function App() {
  
    return (
    <>
      <QueryClientProvider client={queryClient}>
      <Router>  
        <div className="App">
        <Routes >
          <Route exact path="/" element={<Home />} />
          <Route path="/AddBook" element={<AddBook />} />
          <Route exact path="BookDetails/:id" element={<BookView />} />
          <Route exact path="Register" element={<Register />} />
          <Route exact path="Login" element={<Login />} />
          <Route exact path="Testing" element={<Testing />} />
          <Route exact path="SimpleUserDashboard" element={<SimpleUserDashboard />} />
          <Route path="/AddBook/book-details/:title" element={<BookDetails />}/>
        </Routes>
        </div>
      </Router>
      </QueryClientProvider>
    </>
  )
}