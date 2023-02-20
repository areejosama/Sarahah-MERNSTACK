import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="footer">
      <div className='footer-content pt-4 pb-1'>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h4 className='h6 fw-bolder'>1. Create your personal feedback URL</h4>
            <Link to='/signup' className='text-decoration-none here fw-bolder'>Here</Link>
            <p className='mt-2'>People will write anonymous and honest opinions about you on that URL.</p>
          </div>
          <div className="col-md-3">
            <h4 className='h6 fw-bolder'>2. Share the URL through Instagram, Twitter, Facebook etc.</h4>
          </div>
          <div className="col-md-3">
            <h4 className='h6 fw-bolder'>3. Read what people think about you.</h4>
            <p className='mt-2'>The feedback you receive is private - only you can see it..</p>
          </div>
          <div className="col-md-3">
            <h4 className='h6 fw-bolder'>4. Publish your favorite feedbacks.</h4>
            <p className='mt-2'>The feedback you receive is private - only you can see it.</p>
          </div>
        </div>
      </div>
    </div>
    <p className='text-center copyright'>All rights reserved. © Saraha Top Website 2016 - 2023</p>
    </div>
    
  )
}
