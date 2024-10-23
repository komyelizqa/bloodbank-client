import { useState } from 'react'
import './App.scss';
import{BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header/Header";  

function App() {


  return (
    <BrowserRouter>
    <Header />
   <Routes>
   <Route path="/calendar" element={<HomePage />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
