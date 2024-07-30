import React, { useState } from 'react'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'
import { Link } from 'react-router-dom'

function Signup() {

  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    dob: ''
  })

  const signup = async () => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      dob: user.dob
    })

    if(response.data.success){
      toast.success(response.data.message)

      setUser({
        fullName: '',
        email: '',
        password: '',
        dob: ''
      })
    }
    else{
      toast.error(response.data.message)
    }
  }


  return (
    <div>
      <form className='d-flex flex-column position-absolute top-50 start-50 translate-middle bg-info'style={{width:"50%"}} >
      <h1 className='text-center'>User Registration</h1>
        <input
          type="text"
          placeholder="Fullname"
          className='mx-5 my-2 p-2'
          value={user.fullName}
          onChange={(e) => setUser({ ...user, fullName: e.target.value})}
          />

        <input
          type="email"
          placeholder="Email"
          className='mx-5 my-2 p-2'
          value={user.email}
          onChange={(e)=>setUser({...user, email: e.target.value})}
          />

        <input
          type="password"
          placeholder="Password"
          className='mx-5 my-2 p-2'
          value={user.password}
          onChange={(e)=>setUser({...user, password: e.target.value})}
          />

        <input
          type="date"
          placeholder="Date of Birth"
          className='mx-5 my-2 p-2'
          value={user.dob}
          onChange={(e)=>setUser({...user, dob: e.target.value})}
          />

        <button
          type='button'
          className='btn btn-primary  mx-5 my-2'
          onClick={signup}
          >
          Register
        </button>
        <Link to='/login' className='text-center text-dark'>Already have an account? Login</Link>

      </form>


      <Toaster />
    </div>
  )
}

export default Signup
