import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Joi from 'joi';

export default function Send({loggedinuser}) {
    let [errorlist,seterrorlist]=useState([]);
    let [sendtext, setsendtext]=useState('');
    let [sendmessage, setsendmessage]=useState({
    text:''
   });

   function getinputvalue(e){
    sendmessage[e.target.name]=e.target.value;
    setsendmessage(sendmessage)
  }

  function validation(){
    const schema=Joi.object({
       text:Joi.string().required().min(2).max(100)
    });
    return schema.validate(sendmessage, {abortEarly:false});
  }

  async function sendmessages(e){
    e.preventDefault();
    let {data}= await axios.post(`http://localhost:3000/api/v1/mesgs/${loggedinuser}`, sendmessage)
    setsendtext(data.message)
    let validationresult=validation();
    if(validationresult.error){
      seterrorlist(validationresult.error.details);
    }
  }
  return (
    <div className='send h-100'>
        <div className="container">
            <form onSubmit={sendmessages}> 
            <div className="bg-white d-flex flex-column align-items-center justify-content-center mt-5 py-5">
            {errorlist.map((error,index)=> <div key={index} className="alert alert-danger w-50 text-center m-auto mb-2" role="alert">{error.message}</div>)}
            {sendtext?<div className="alert alert-secondary w-50 text-center m-auto mb-2" role="alert">{sendtext}</div>:''}
             <h4 className='fw-bolder h6'>Leave a constructive message :)</h4>
               <div className="form-floating">
                   <textarea className="form-control mt-3 h-100" id="floatingTextarea2" name='text' rows='5' cols='90' onChange={getinputvalue}></textarea>
               </div>
               <button className='px-2 py-1 btn my-3'>Send</button> 
        </div>
        </form>
        </div>
    </div>
  )
}
