import React, { useEffect, useState } from 'react'
import toast, {Toaster} from 'react-hot-toast'
import axios from 'axios'
import ImgAdd from "./add.png"
import { Link } from 'react-router-dom'

function Home() {
  const [user, setUser] = useState('')
  const [transactions, setTransactions] = useState([])
  const [netIncome, setNetIncome] = useState(0)
  const [netExpense, setNetExpense] = useState(0)

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    if(currentUser){
      setUser(currentUser)
    }

    if(!currentUser){
      window.location.href = '/login'
    }
  }, [])

  const loadTransactions = async () => {
    if(!user._id){
      return
    }
    toast.loading('Loading transactions...')

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions?userId=${user._id}`)

    const allTransactions = response.data.data
    toast.dismiss()

    setTransactions(allTransactions)
  }

  useEffect(() => {
    loadTransactions()
  }, [user])

  useEffect(() => {
    let income = 0
    let expense = 0

    transactions.forEach((transaction) => {
      if (transaction.type === 'credit') {
        income += transaction.amount
      }
      else{
        expense += transaction.amount
      }
    })

    setNetIncome(income)
    setNetExpense(expense)
  }, [transactions])

  return (
    <div>
      <h1 className='text-center'>Hello {user.fullName}</h1>
      <h2 className='text-center'>Welcome to the Expense Tracker</h2>

      <span style={{height:"40px",position:"fixed",right:"10px",top:"10px",cursor:"pointer"}} onClick={() => {
        localStorage.clear()
        toast.success('Logged out successfully')

        setTimeout(()=>{
          window.location.href = '/login'
        }, 3000)
      }}>
        Logout
      </span>

      <div className='d-fex justify-content-around mx-5 my-5'>

        <div className='border border-primary-1 p-3 rounded'>
          <span className='d-block text-center fs-4 fw-bold'>
            + {netIncome}
          </span>
          <span className='d-block text-center'>
            Net Income
          </span>
        </div>

        <div className='border border-primary-1 p-3 rounded'>
          <span className='d-block text-center fs-4 fw-bold'>
            - {netExpense}
          </span>
          <span className='d-block text-center'>
           Net Expense
          </span>
        </div>

        <div className='border border-primary-1 p-3 rounded'>
          <span className='d-block text-center fs-4 fw-bold'>
            {netIncome - netExpense}
          </span>
          <span className='d-block text-center'>
            Net Balance
          </span>
        </div>

      </div>

     

      <Link to='/add-transaction'>
        <img src={ImgAdd} alt='Add Transaction' className='bg-light p-2 rounded border border-primary-2'style={{height:"40px",position:"fixed",right:"10px",bottom:"10px",cursor:"pointer"}} />
      </Link>

      <Toaster />
    </div>
  )
}

export default Home
