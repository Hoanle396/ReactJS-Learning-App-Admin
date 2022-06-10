
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "../axios.cf";
export default function Login({ doLogin, auth }) {
   const [username, setUsername] = useState()
   const [password, setPassword] = useState()
   const [error, setError] = useState("")
   const navigate = useNavigate()
   
   const handleSubmit = () => {
      setError("")
      axios.post('/auth/login/admin', { username: username, password: password })
         .then((res) => {
            doLogin(res.data.access_token)
            localStorage.setItem('token', res.data.access_token)
            navigate('/')
         })
         .catch((err) => {
            console.log(err)
            setError(err.message)
         })
   }
   return (
      <>
         <div className="page-header min-vh-100">
            <div className="container mt-5 ">
               <div className="row d-flex align-center justify-content-center">
                  <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                     <div className="card card-plain">
                        <div className="card z-index-0">
                           <div className="card-header text-center pt-4">
                              <h5>Login</h5>
                           </div>
                           <div className="row px-xl-5 px-sm-4 px-3 d-flex justify-content-center">
                              <div className="mt-2 position-relative text-center">
                                 <p className="text-sm font-weight-bold mb-2 text-danger text-border d-inline z-index-2 bg-white px-3">
                                    {error}
                                 </p>
                              </div>
                           </div>
                           <div className="card-body">
                                 <div className="mb-3">
                                    <input value={username} onChange={(e)=>setUsername(e.target.value)} type="email" name='email' id='email' className="form-control rounded-pill form-control-lg" placeholder="Email" aria-label="Email" />
                                  </div>
                                 <div className="mb-3">
                                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name='password' id='password' className="form-control rounded-pill form-control-lg" placeholder="Password" aria-label="Password" />
                                   

                                 </div>
                                 
                                 <div className="text-center">
                                    <button type="button" onClick={handleSubmit} className="btn rounded-pill btn-lg btn-primary btn-lg w-100 mt-4 mb-0">Sign in</button>
                                 </div>
                           </div>
                           
                        </div>
                     </div>
                  </div>
                  
               </div>
            </div>
         </div>
      </>
   )
}