import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginNow = async() => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      email: email,
      password: password
    })
    if(response.data.success){
      toast.success(response.data.message)

      localStorage.setItem('currentUser', JSON.stringify(response.data.data))

     toast.loading('Redirecting to dashboard...')

     setTimeout(()=>{
       window.location.href = '/'
     }, 3000)
    }else{
      toast.error(response.data.message)
    }
  }

  return (
    <div>

      <form className='d-flex flex-column position-absolute top-50 start-50 translate-middle bg-info h-50'>
      <br/><br/>
      <h1 className='text-center'>User Login</h1>
        <input
          type='email'
          placeholder='Email'
          className='mx-5 my-2 p-2'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />

        <input
          type='password'
          placeholder='Password'
          className='mx-5 my-2 p-2'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

        <button
          type='button'
          onClick={loginNow}
          className='btn btn-primary  mx-5 my-2'>
          Login
        </button>
        <Link to='/signup' className='text-center text-dark'>Don't have an account? Signup</Link>

      </form>


      <Toaster />
    </div>
  )
}

export default Login
