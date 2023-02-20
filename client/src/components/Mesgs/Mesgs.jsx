import React, { useState, useEffect } from 'react';
import axios from 'axios'


export default function Mesgs() {
  let [messageslist, setmessageslist]=useState([]);

  async function viewMessages(){
        let {data} =await axios.get('http://localhost:3000/api/v1/mesgs/mymessages',{  
           headers:{
            token:`hello__${localStorage.getItem("token")}`
             }
        })
     setmessageslist(data.messages)
  }

  async function deletemessage(mesgid){
      let {data} =await axios.delete(`http://localhost:3000/api/v1/mesgs/deletemesg/${mesgid}`,{  
        headers:{
          token:`hello__${localStorage.getItem("token")}`
           }
     });
     alert(data.message);
     viewMessages();
  }

//   async function userqrcode(){
//     let {data}= await axios.get("http://localhost:3000/api/v1/users/getuser",{  
//      headers:{
//        token:`hello__${localStorage.getItem("token")}`
//         }
//   });
//   setuserdetails(data.user)
//   getdownload(data.url)
//  }
 
//  function getinputvalue(e){
//   setuserimage(e.target.files[0])
//   setupload(true)
//  }

//  async function uploadpic(){
//   const formdata = new FormData();
//   formdata.set('image', image)
//   let {data}= await axios.post("http://localhost:3000/api/v1/users/uploadpic",formdata,{  
//    headers:{
//      token:`hello__${localStorage.getItem("token")}`,
//      'content-type': 'multipart/form-data'
//    }}) 
// }

// if(upload){
//   uploadpic();
//   setupload(false);
// }

useEffect(()=>{
  viewMessages();
},[])

  return (
    <div className='mesgs'>
      <div className="container">
        <div className="row mt-5">
         {/* <div className="col-md-4 mt-5 bg-white me-4">
            <div className="user-content py-5 d-flex flex-column align-items-center">
                     <label>
                      <input type="file" className='d-none' name='file' onChange={getinputvalue}/>
                      <img src={userdetails.user.profilepic} className='rounded-circle mt-3' width='120px' height='120px'/> 
                      </label>
                      <h5 className='mt-3'>{userdetails.user.name}</h5>
                      <Link to='sendMessage' className='text-decoration-none link fw-bolder mt-2'>Saraha.top/{userdetails.user._id}</Link>
                      <img src={userdetails.url} className="mt-3"/>
               </div>
         </div> */}
         
         <div className="col-md-7 mt-5 py-5 bg-white m-auto">
            <h5 className='text-center py-3 rounded-2'><i className="fa-solid fa-message"></i> Messages</h5>
         {messageslist.map((message,index)=><div className='border border-dark-subtle border-3 rounded-2 mt-3 m-content m-auto position-relative' key={index}>
          <div className='ms-2'>
          <button type="button" className="btn-close position-absolute" aria-label="Close" onClick={()=> deletemessage(message._id) }></button>
          <h3>{message.text}</h3>
              <br></br>
              <h6 className='mt-4 text-muted create'>{message.createdAt}</h6>
          </div>
        </div>)}
         </div>
        </div>
      </div>
    </div>

    
  )}
