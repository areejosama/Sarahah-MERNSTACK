import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Account from './components/Account/Account';
import Mesgs from './components/Mesgs/Mesgs';
import Password from './components/Password/Password';
import Contact from './components/Contact/Contact';
import Notfound from './components/Not Found/Notfound';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Send from './components/Send/Send';

export default function App() {
  let navigate=useNavigate(); 
  let [loggedinuser, setloggedinuser]= useState(null);
  let [userdetail, getuserdetails]= useState();
  
  function setuserdetails(){
   let token = localStorage.getItem("token");
   let decode= jwtDecode(token);
   setloggedinuser(decode.id);
   getuserdetails(decode.id)
  }

  function logout(){
      localStorage.removeItem("token");
      setloggedinuser(null);
      navigate('/login')
  }

  useEffect(()=>{
     if(localStorage.getItem("token")){
       setuserdetails();
     }
  },[])

  return (
    <div>
      <Navbar loggedinuser={loggedinuser} logout={logout}/>
      <Routes>
        <Route path='login' element={<Login setuserdetails={setuserdetails}/>}></Route>
        <Route path='signup' element={<Signup/>}></Route>
        <Route path='account' element={<Account/>}></Route>
        <Route path='messages' element={<Mesgs/>}></Route>
        <Route path='forgetpassword' element={<Password/>}></Route>
        <Route path='contact' element={<Contact/>}></Route>
        {loggedinuser? 
        <Route path='/' element={<Account/>}></Route>
        : 
        <Route path='/' element={<Signup/>}></Route>
        }
        <Route path={`sendMessage/${userdetail}`} element={<Send loggedinuser={loggedinuser}/>}></Route>
        <Route path='*' element={<Notfound/>}></Route>
      </Routes>
      <Footer/>
    </div>
  )}

