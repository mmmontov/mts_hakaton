//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import DataFetchingComponent from './DataFetchingComponent'
import DepartmentTree from './Card.jsx'
import sampleData from "./sampleData.jsx";

function App() {
  return (
    <div className="App">
      <h1>Департаменты</h1>
      <DepartmentTree data={sampleData} />
      <DataFetchingComponent/>
    </div>
  )
}

export default App
