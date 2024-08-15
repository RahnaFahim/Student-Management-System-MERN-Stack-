import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Welcome from './Welcome'; 
import StudentSignup from './StudentSignup'
import StudentLogin from './StudentLogin';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard'; 
import UpdateStudent from './UpdateStudent'; 

//contains the Routes for Jsx files

function App() {
  

  return (
  <BrowserRouter>
  <Routes> 
    <Route path="/" element={<Welcome />} />
    <Route path="/student-signup" element={<StudentSignup />}></Route>
    <Route path="/student-login" element={<StudentLogin />}> </Route>
    <Route path='/register' element={<Signup />}></Route>
    <Route path='/login' element={<Login />}></Route>
    <Route path="/student-dashboard" element={<StudentDashboard />}></Route>  
    <Route path="/teacher-dashboard" element={<TeacherDashboard />}></Route> 
    <Route path="/update-student/:id" element={<UpdateStudent />}></Route>
  </Routes>
  </BrowserRouter>
  )
}

export default App
