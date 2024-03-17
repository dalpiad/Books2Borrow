import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <h1>Books 2 Borrow</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <h1>Hello this is test code. Demonstrating how to do a pull request.</h1>
      </div>
  
      </div>
    </>
  )
}

export default App
