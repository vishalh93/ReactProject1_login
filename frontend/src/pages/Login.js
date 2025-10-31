import React, { useState } from 'react'
import { Link,useNavigate  } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError } from './utils'
import { handleSuccess } from './utils'

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  //............................ Calling Hook with useNavigation ......
       const navigate = useNavigate();
    // ------------------------------------------------------------------   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };
   // console.log("Information Setting  : ",loginInfo)
  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;
    if (!email) {
                return handleError("Please enter your email");
              } else if (!password) {
                return handleError("Please enter your password");
              } 
    // if (!name || !email || !password || !mobile) {
    //   return handleError("Please fill all required fields");
    // }

    try {
      const url = 'http://localhost:8080/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();
      //-------------------------------------- Signup Result Success or False ----------------------------------------------
     // console.log("loginInfo Result:", result);
      //-------------------------------------- Take Variable for Athentication ----------------------------------------------
    const {success, message, error, name,jwtToken } = result
          localStorage.setItem("Token", jwtToken);          //// Storing Token in Local Storage
          localStorage.setItem("loggedInUser", name);            // Storing User name in Local Storage
      if (success) {
        handleSuccess(success.message || "Login successful!");
        
            setTimeout(()=>{
                navigate('/home');
            }, 1000)
          //  Window.location.href = '/login';
          //  setTimeout(()=>{navigate('/login')}, 1000)
       
      } else {
        const details = error?.details[0].message;          // fatching Details from Server site if Available 
        handleError(details || "Login failed!");           // showin Error from Server site if Available
      }
    } catch (error) {
      console.error("Error during Login:", error);
      handleError(error.message || "Something went wrong");
    }
  };

  return (
    //-------------------------- HTML Page ----------------------------
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            id="email"
            autoComplete="email"
            type="email"
            name="email"
            value={handleLogin.email}
            placeholder="Enter your email..."
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            id="new-password"
            autoComplete="new-password"
            type="password"
            name="password"
            value={handleLogin.password}
            placeholder="Enter your password..."
          />
        </div>

        <button type="submit"> Login </button>

        <span>
          Does't have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Login
