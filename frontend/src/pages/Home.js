import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from './utils';

function Home() {
  const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser]= useState('')
      useEffect(()=>{
        setLoggedInUser(localStorage.getItem('loggedInUser'))     
      },[])
      // console.log('LoggedIn User : ', loggedInUser)
  const handleLogout = ()=>{
    localStorage.removeItem('Token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('Logged Out Successfully ');
    setTimeout(()=>{
      navigate('/login');
      },1000)
  }    
  return (
    <div>
      <h1> Welcome Mr/Mis : {loggedInUser} </h1>
      <button onClick={handleLogout}> Logout </button>
      <ToastContainer />
    </div>
  )
}

export default Home
