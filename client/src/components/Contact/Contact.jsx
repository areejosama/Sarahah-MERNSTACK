import React from 'react'

export default function Contact() {
  return (
    <div className='contact px-5'>

    <div className="container mt-5">
    <h5 className='text-bolder pt-5 mb-4'>You can contact us by filling in the form below</h5>
    <hr></hr>

    <div className="row mt-5">
 <div className="col-md-3  text-end">
   <label htmlFor="inputname" className="col-form-label "> Name</label>
 </div>
 <div className="col-md-8">
 <div className="input-group">
   <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
 </div>
</div>
</div>


<div className="row mt-3">
 <div className="col-md-3  text-end">
   <label htmlFor="inputemail" className="col-form-label ">Email</label>
 </div>
 <div className="col-md-8">
   <input type="email" id="email" className="form-control" aria-describedby="passwordHelpInline"/>
 </div>
</div>

<div className="row mt-3">
 <div className="col-md-3 text-end">
   <label htmlFor="inputPassword6" className="col-form-label ">Message Title</label>
 </div>
 <div className="col-md-8">
   <input type="text" id="text" className="form-control" aria-describedby="passwordHelpInline"/>
 </div>
</div>

<div className="row mt-3">
 <div className="col-md-3 text-end">
   <label htmlFor="inputmessage" className="col-form-label ">Message</label>
 </div>
 <div className="col-md-8">
 <textarea className="form-control" id="floatingTextarea"></textarea>
 <button className='mt-4 mb-4 px-2 py-1 btn'>Send</button>
     </div>
</div>

    
    </div>
   </div>
  )
}
