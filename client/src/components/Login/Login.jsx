import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Joi from 'joi';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function Login({setuserdetails}){

  let navigate=useNavigate(); 
  let [errorlist,seterrorlist]=useState([]);
  let [message, setmessage]=useState('');

  let[user, setuser]=useState({
    email:'',
    password:''
  });

  function getinputvalue(e){
    let myuser={...user};
    myuser[e.target.name]=e.target.value;
    setuser(myuser);
  }
  function validation(){
    const schema=Joi.object({
       email:Joi.string().email({tlds:{allow:['com','net']}}).required(),
       password:Joi.string().min(5).max(20).required()
    });
    return schema.validate(user, {abortEarly:false});
  }
  async function submitFormData(e){
    e.preventDefault();
    let {data}= await axios.post("http://localhost:3000/api/v1/auth/signin",user);
    setmessage(data.message);
    localStorage.setItem("token", data.token);
    
    if(data.message == 'success login'){
      setuserdetails();
      navigate('/messages');
    }
    let validationresult=validation();
    if(validationresult.error){
      seterrorlist(validationresult.error.details);
    }
   }

  return (
    <div className='login py-5 text-center mt-5'>
        <h3>Account Login</h3>
        <br></br>
        {errorlist.map( (error, index)=> <div key={index} className="alert alert-danger w-50 text-center m-auto mb-2" role="alert">{error.message}</div>)}
        {message?<div className="alert alert-secondary w-50 text-center m-auto mb-2" role="alert">{message}</div>:''}
        
        <form onSubmit={submitFormData}>
        <div className="lcontent d-flex flex-column justify-content-start align-items-center">
        <input type="email" id="email" name="email" placeholder="Email" className='form-control w-25 mt-4 py-2 rounded round-3 border border-secondary-subtle' onChange={getinputvalue}/>
        <input type="password"  id="password" name="password" placeholder="Password" className=' form-control w-25 mt-4 py-2 rounded round-3 border border-secondary-subtle' onChange={getinputvalue}/>
        <button className='mt-4 mb-4 px-2 py-1 btn'>Login</button>
        <Link to='/forgetpassword' className='text-decoration-none forgetpass'>I Forgot My Password</Link>
        </div>

        </form>
       
    </div>
  )
}
