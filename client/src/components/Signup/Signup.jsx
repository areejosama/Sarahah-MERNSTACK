import React, {  useState } from 'react';
import Joi from 'joi';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function Signup() {
  let [message, setmessage]=useState('');
  let [errorlist,seterrorlist]=useState([]);
  let [user, setuser]=useState({
      name:'',
      email:'',
      password:'',
      cpassword:'',
      //pic:''
  });
   let navigate=useNavigate(); 

   function gotologin(){
    let path='/login';
    navigate(path);
   }
  async function submitFormData(e){
    e.preventDefault();
    let {data}= await axios.post("http://localhost:3000/api/v1/auth/signup",user);
    setmessage(data.message);
    if(data.message == 'success'){
      gotologin();
    }
    let validationresult=validation();
    if(validationresult.error){
      seterrorlist(validationresult.error.details);
    }
   }
  function getinputvalue(e){
     let myuser={...user};
     myuser[e.target.name]=e.target.value;
     setuser(myuser);
  }
  function validation(){
    const schema=Joi.object({
       name:Joi.string().min(3).max(15).required(),
       email:Joi.string().email({tlds:{allow:['com','net']}}).required(),
       password:Joi.string().min(5).max(20).required(),
       cpassword:Joi.string().valid(Joi.ref('password')).required(),
    });
    return schema.validate(user, {abortEarly:false});
  }

  return (
    <div className='signup px-5'>
     <div className="container mt-5">
     <h5 className='text-bolder pt-5 mb-4'>Register</h5>
     <hr></hr>

     {errorlist.map( (error, index)=> <div key={index} className="alert alert-danger w-50 text-center m-auto mb-2" role="alert">{error.message}</div>)}
     {message?<div className="alert alert-secondary w-50 text-center m-auto mb-2" role="alert">{message}</div>:''}
     <form onSubmit={submitFormData}>
      {/* name */}
     <div className="row mt-3">
       <div className="col-md-3  text-end">
         <label htmlFor="inputPassword6" className="col-form-label">Name</label>
       </div>
     <div className="col-md-8">
        <div className="input-group">
          <span className="input-group-text" id="basic-addon3">Sarahah.top/</span>
        <input type="text" className="form-control" id="name" aria-describedby="basic-addon3" onChange={getinputvalue} name='name' />
       </div>
     </div>
      </div>
      {/* email */}

      <div className="row mt-3">
        <div className="col-md-3 text-end">
             <label htmlFor="inputemail" className="col-form-label ">Email</label>
        </div>
        <div className="col-md-8">
            <input type="email" className="form-control" id="email" onChange={getinputvalue} name='email' />
        </div>
      </div>

      {/* password */}

      <div className="row mt-3">
        <div className="col-md-3 text-end">
        <label htmlFor="inputpassword" className="col-form-label ">Password</label>
        </div>
        <div className="col-md-8">
        <input type="password" className="form-control" id="password" onChange={getinputvalue} name="password"/>
        </div>
      </div>

      {/* cpassword */}

      <div className="row mt-3">
        <div className="col-md-3 text-end">
        <label htmlFor="inputcPassword" className="col-form-label ">Confirm Password</label>
        </div>
        <div className="col-md-8">
        <input type="password" className="form-control" id="cpassword" onChange={getinputvalue} name="cpassword" />
        </div>
      </div>

       {/* userpic */}

        {/* <div className="row mt-3">
        <div className="col-md-3 text-end">
        <label htmlFor="inputcpic" className="col-form-label ">Photo (optional)</label>
        </div>
        <div className="col-md-8">
        <input type="file" className="form-control" id="pic" onChange={getinputvalue} name="pic" />
        </div>
      </div>   */}
      <div className="row mt-3">
       <div className="col-md-3">
       </div>
       <div className="col-md-8">
      <button className='mb-4 px-2 py-1 btn'>Register</button>
       </div>
      </div>
      
     </form>
     </div>
    </div>
  )
}
