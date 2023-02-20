import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { Link , useNavigate } from 'react-router-dom'
import FormData from 'form-data'

export default function Account() {
  let [userdetails, getuserdetails]=useState();
  let [upload, setupload]=useState(false);
  let [image, setuserimage]= useState({
    file:''
  });
  let [updateuserpass, setupdateuserpass]=useState({
       oldpass:'',
       newpass:''
  });
  let [errorlist,seterrorlist]=useState([]);
  let [message, setmessage]=useState();
  let navigate=useNavigate(); 

  async function getuser(){
    let {data}= await axios.get("http://localhost:3000/api/v1/users/getuser",{  
     headers:{
       token:`hello__${localStorage.getItem("token")}`
        }
  });
  getuserdetails(data);
 }

//get values from input fields
  function getinputvalue(e){
    updateuserpass[e.target.name]=e.target.value;
    setupdateuserpass(updateuserpass);
  }

  function getfilevalue(e){
    setuserimage(e.target.files[0]);
    setupload(true);
  }

  //value validation
  function validation(){
    const schema=Joi.object({
      oldpass:Joi.string().required().min(5).max(20),
      newpass:Joi.string().required().min(5).max(20)
    });
    return schema.validate(updateuserpass, {abortEarly:false});
  }

  async function deleteaccount(){
    let {data}= await axios.delete("http://localhost:3000/api/v1/users/deleteaccount")
    if(data.message == 'success')
    localStorage.removeItem("token")
    navigate('/signup')
  } 

  async function changepassword(e){
    e.preventDefault();
    let {data}= await axios.patch("http://localhost:3000/api/v1/users/updateuser", updateuserpass, {  
      headers:{
        token:`hello__${localStorage.getItem("token")}`
         }});
    setmessage(data.message);
    let validationresult=validation();
    if(validationresult.error){
      seterrorlist(validationresult.error.details);
    }
  }

  async function uploadpic(){
       let formdata = new FormData();
       formdata.set('image', image);
       let {data}= await axios.post("http://localhost:3000/api/v1/users/uploadpic",formdata,{  
        headers:{
          token:`hello__${localStorage.getItem("token")}`,
          'content-type': 'multipart/form-data'
        }
     }) 
     
  }

  if(upload){
    uploadpic();
    window.location.reload(false);
    setupload(false);
  }

  useEffect(()=>{
    getuser();
  },[])

  return (
    <div className='account'>
      <div className="container">
      <div className="row mt-5">
         <div className="col-md-3 mt-5 bg-white me-4">
         {userdetails?
         <div className="user-content py-5 d-flex flex-column align-items-center">
         <label>
         <input type="file" className='d-none' name='file' onChange={getfilevalue}/>
         <img src={userdetails.user.profilepic} className='rounded-circle mt-3' width='120px' height='120px'/>
         </label>
        <h5 className='mt-3'>{userdetails.user.name}</h5>
         <Link to={`/sendMessage/${userdetails.user._id}`} className='text-decoration-none link fw-bolder mt-2'>Saraha/{userdetails.user._id}</Link>
         <img src={userdetails.url} className="mt-3"/> 
     </div> :''}  
         </div>
         <div className="col-md-8 mt-5 py-5 bg-white ">
               <div className="user-content mb-5 ms-5">
                       <h5 className='rounded-2'><i className="fa-solid fa-user-slash"></i> Delete Account</h5>
                       <hr></hr>
                       <p className='text-danger'>You will lose all content and data on this account, such as incoming messages and photos</p>
                       <button className='btn btn-danger bg-white text-danger border border-danger' onClick={deleteaccount}>Delete Account</button>
               </div>

               {errorlist.map( (error, index)=> <div key={index} className="alert alert-danger w-50 text-center m-auto mb-2" role="alert">{error.message}</div>)}
               {message?<div className="alert alert-secondary w-50 text-center m-auto mb-2" role="alert">{message}</div>:''}

               <div className="user-content mb-2 ms-5 mt-5">
                       <h5 className=' rounded-2'><i className="fa-solid fa-lock"></i> Change password</h5>
                       <hr></hr>
                       <form onSubmit={changepassword}>
                       <div className="row mt-3">
        <div className="col-md-3 text-end">
        <label htmlFor="inputpassword" className="col-form-label ">Current Password</label>
        </div>
        <div className="col-md-8">
        <input type="password" className="form-control" id="oldpass" name="oldpass" onChange={getinputvalue}/>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3 text-end">
        <label htmlFor="inputcPassword" className="col-form-label ">New Password</label>
        </div>
        <div className="col-md-8">
        <input type="password" className="form-control" id="newpass" name="newpass" onChange={getinputvalue}/>
        <button className='px-2 py-1 btn my-3'>Change</button>
        </div>
      </div>
                       </form>
                  
               </div>
         </div>
        </div>
      </div>
    </div>
  )
}
