import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AgeVerificationShowcase from "./components/age-verification/AgeVerificationShowcase.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <AgeVerificationShowcase />;
      </div>
   
    </>
  );
}

export default App
