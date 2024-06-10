import { createRoot } from 'react-dom/client'
import { useState } from 'react'

function App() {
  return (
    <>
      <h1>Hello, Hono with React!</h1>
      <h2>Example of useState()</h2>
      <Counter />
    </>
  )
}

function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>You clicked me {count} times</button>
}

const domNode = document.getElementById('root')!
const root = createRoot(domNode)
root.render(<App />)
