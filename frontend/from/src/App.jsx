import { useState } from 'react'
import './App.css'
import { Form } from './components/Form'
import {Routes,Route, Navigate} from "react-router-dom"
import { SignUp } from './components/SignUp'
import { Home } from './components/Home'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Form/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/Home' element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
