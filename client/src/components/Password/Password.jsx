import React, { useState } from 'react'
import axios from 'axios';
import Joi from 'joi';

export default function Password() {
  let [datapass, setdatapass]=useState();
  let [errorlist,seterrorlist]=useState([]);
  let [forgetpass, setforgetpass]=useState({
       code:'',
       email:'',
       newpass:'',
       cpassword:''
  });

  function getinputvalue(e){
    forgetpass[e.target.name]=e.target.value;
    setforgetpass(forgetpass);
  }

  function validation(){
    const schema=Joi.object({
      code:Joi.string().required().min(5).max(5),
      email:Joi.string().required().email(),
      newpass:Joi.string().required().min(5).max(20),
      cpassword:Joi.string().valid(Joi.ref('newpass')).required()
    });
    return schema.validate(forgetpass, {abortEarly:false});
  }
  async function submitFormData(e){
    e.preventDefault();
    let {data}= await axios.get("http://localhost:3000/api/v1/auth/forgetpassword", forgetpass)
    setdatapass(data.message)
    let validationresult=validation();
    if(validationresult.error){
      seterrorlist(validationresult.error.details);
    }
  }
  return (
    <div className='password py-5 mt-5'>
      <form onSubmit={submitFormData} className='w-25 m-auto'>
      <div className="pcontent d-flex justify-content-center align-items-center flex-column ">
        <h3 className='text-center'>Forgot Password</h3>
        {errorlist.map( (error, index)=> <div key={index} className="alert alert-danger w-50 text-center m-auto mb-2" role="alert">{error.message}</div>)}
        {datapass?<div className="alert alert-secondary w-50 text-center m-auto mb-2" role="alert">{datapass}</div>:''}
        
        <input type="text" className="form-control mt-4 py-2 rounded round-3 border border-secondary-subtle" id="code" name='code' placeholder="Code" onChange={getinputvalue}/>
        <input type="email" className="form-control mt-4 py-2 rounded round-3 border border-secondary-subtle" id="email" name='email' placeholder="Email" onChange={getinputvalue}/>
        <input type="password" className="form-control mt-4 py-2 rounded round-3 border border-secondary-subtle" id="newpass" name='newpass' placeholder="New Password" onChange={getinputvalue}/>
        <input type="password" className="form-control mt-4 py-2 rounded round-3 border border-secondary-subtle" id="cpassword" name='cpassword' placeholder="Confirm Password" onChange={getinputvalue}/>
        <button className='mt-4 mb-4 px-2 py-1 btn'>Send</button>

    </div>
      </form>
   
</div>
  )
}
