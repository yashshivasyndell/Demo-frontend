import { useState } from 'react'
import './App.css'
import { Form } from './components/Form'
import {Routes,Route, Navigate} from "react-router-dom"
import { Login } from './components/Login'
import { Home } from './components/Home'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Form/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/Home' element={<Home/>}/>
    </Routes>
    </>
  )
}

export default App
