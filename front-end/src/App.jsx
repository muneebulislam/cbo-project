import { useState } from 'react'
import './App.css'
import {Routes, Route } from "react-router-dom";
import Contact from './components/Contact'
import ErrorPage from './components/ErrorPage'
import Home from './components/Home'
import NavBar from './components/NavBar'


function App() {

  return (
    <div className="App"> 
        <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
        
    </div>
  )
}

export default App
