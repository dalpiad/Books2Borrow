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
import PrivateRoutes from './util/PrivateRoutes'


const queryClient = new QueryClient();

export default function App() {
  
    return (
    <>
      <QueryClientProvider client={queryClient}>
      <Router>  
        <div className="App">
        <Routes >
        <Route element={<PrivateRoutes/>}>
              <Route exact path="SimpleUserDashboard" element={<SimpleUserDashboard />} />
              <Route path="/AddBook" element={<AddBook />} />
              <Route exact path="BookDetails/:id" element={<BookView />} />
              <Route exact path="Testing" element={<Testing />} />
              <Route path="/AddBook/book-details/:title" element={<BookDetails />}/>
          </Route>
          <Route exact path="/" element={<Home />} />
          <Route exact path="Register" element={<Register />} />
          <Route exact path="Login" element={<Login />} />
        </Routes>
        </div>
      </Router>
      </QueryClientProvider>
    </>
  )
}