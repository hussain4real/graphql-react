import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <p className="container mx-auto text-teal-600 text-3xl font-bold underline">
          Hello Vite + React + Tailwind CSS!
        </p>
      </div>

    </>
  )
}

export default App
