import React, { useState } from 'react'
import { apiurl } from '../apiurl';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom';


const Login = ({ handleLogin }) => {

  const [isLogin, setIsLogin] = useState(false);

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const [userdata, setUserdata] = useState('')

  const navigate = useNavigate();


  // login function
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const body = { userdata, password }; // Assuming userdata and password are defined elsewhere      
      const response = await axios.post(apiurl + 'login', body, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      sessionStorage.setItem("token", response?.data?.token);
      // let user = JSON.stringify(response?.data?.user[0]);
      // console.log(user)

     // sessionStorage.setItem("user", user);
      handleLogin(response?.data?.user[0])
      toast.success(response?.data?.message);

      navigate('/home/todo');


    } catch (error) {
      toast.error(error.response?.data?.message)
      console.log(error);
    }
  };


  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const body = { firstName, lastName, email, phone, password };
      console.log(body);
      const response = await axios.post(apiurl + 'register', body, {
        withCredentials: true
      });
      setIsLogin(false);
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
      console.error(error);
    }
  };


  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <ToastContainer />
      <div className='flex items-center justify-evenly w-[80%]'>

        <div >
          <div className='my-5'>
            <h1 className='font-bold text-3xl'>
              Welcome to todo app
            </h1>
          </div>
          <h1 className='mt-4 mb-2 text-2xl font-bold'>{!isLogin ? "Login" : "Sign Up"}</h1>
          <form action='/' className='flex flex-col w-[75%]' onSubmit={!isLogin ? loginHandler : registerHandler}>
            {!isLogin ? <>
              <input type='text' value={userdata} onChange={(e) => setUserdata(e.target.value)} placeholder='Email or phone or username' className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full my-1 font-semibold' required />
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full my-1 font-semibold' required />
            </> : <>
              <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full my-1 font-semibold' required />
              <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full my-1 font-semibold' required />
              <input type='email' value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email' className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full my-1 font-semibold' required />
              <input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone Number' className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full my-1 font-semibold' required />
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full my-1 font-semibold' required />

            </>}
            <button type='submit' className='bg-[#1D9BF0] border-none py-2 rounded-full text-lg text-white my-2'>{isLogin ? "Create Account" : "Login"}</button>
            <h1>{isLogin ? "Already have an account?" : "Do not have an account"} <span className='font-bold text-blue-500 cursor-pointer' onClick={() => setIsLogin(!isLogin)}>{!isLogin ? "Sign Up" : "Login"}</span></h1>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
