import React from 'react'
import {Navigate, useNavigate} from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate();

  return (
    <div className='bg-neutral-900 h-screen flex justify-center items-center'>
      <button className='text-slate-300 border p-3 rounded-lg' onClick={()=>{navigate('/Home')}}>Enter the chat room</button>
    </div>
  )
}
