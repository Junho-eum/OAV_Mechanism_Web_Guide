import { useState } from 'react'
import './App.css'
import AgeVerificationShowcase from "./components/age-verification/AgeVerificationShowcase.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <AgeVerificationShowcase />
      </div>
   
    </>
  );
}

export default App
