import React,{useState} from 'react'
import Layout from './../../components/Layout/Layout'
import {toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "../../styles/AuthStyles.css"
import { useAuth } from '../../context/auth'

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [auth,setAuth]=useAuth()
    const navigate= useNavigate()

    const handleSubmit= async (e)=>{
    e.preventDefault()
  try {
    const res = await axios.post("/api/v1/auth/login",{
        email,password,
    })
    
  if(res && res.data.success){
    toast.success(res.data.message)
    setAuth({
        ...auth,
        user:res.data.user,
        token:res.data.token,

    })
    localStorage.setItem('auth',JSON.stringify(res.data))
    navigate("/")
  }else{
    toast.error(res.data.message)
  }
  } catch (error) {
    console.log(error)
    toast.error('Something went wrong')
  }
  }
  return (
     <Layout title={"Register- Ecommerce App"}>
<div className="form-container">
      <h4 className='title'>Login Page</h4>
     <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail" className="form-label">Email</label>
    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" className="form-control" id="exampleInputEmail1"/>
  </div>
   <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
  </div> 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>


</div>
    </Layout>
  )
}

export default Login
