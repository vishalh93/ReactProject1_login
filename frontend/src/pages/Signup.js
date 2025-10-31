import React, { useState } from 'react'
import { Link,useNavigate  } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError } from './utils'
import { handleSuccess } from './utils'

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
    mobile: ''
  });
  //............................ Calling Hook with useNavigation ......
       const navigate = useNavigate();
    // ------------------------------------------------------------------   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };
    console.log("Information Setting  : ",signupInfo)
  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password, mobile } = signupInfo;
    if (!name) {
          return handleError("Please enter your name");
              } else if (!email) {
                    return handleError("Please enter your email");
              } else if (!password) {
                return handleError("Please enter your password");
              } else if (!mobile) {
                return handleError("Please enter your mobile number");
              }
    // if (!name || !email || !password || !mobile) {
    //   return handleError("Please fill all required fields");
    // }

    try {
      const url = 'http://localhost:8080/auth/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupInfo)
      });

      const result = await response.json();
      //-------------------------------------- Signup Result Success or False ----------------------------------------------
      console.log("Signup Result:", result);
      //-------------------------------------- Take Variable for Athentication ----------------------------------------------
    const {success, message, error } = result
      if (success) {
        handleSuccess(success.message || "Signup successful!");
        
            setTimeout(()=>{
                navigate('/login');
            }, 1000)
          //  Window.location.href = '/login';
          //  setTimeout(()=>{navigate('/login')}, 1000)
       
      } else {
        const details = error?.details[0].message;          // fatching Details from Server site if Available 
        handleError(details || "Signup failed!");           // showin Error from Server site if Available
      }
    } catch (error) {
      console.error("Error during signup:", error);
      handleError(error.message || "Something went wrong");
    }
  };

  return (
    //-------------------------- HTML Page ----------------------------
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            id="uname"
            autoComplete="uname"
            type="text"
            name="name"
            value={signupInfo.name}
            autoFocus
            placeholder="Enter your name..."
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            id="email"
            autoComplete="email"
            type="email"
            name="email"
            value={signupInfo.email}
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
            value={signupInfo.password}
            placeholder="Enter your password..."
          />
        </div>

        <div>
          <label htmlFor="mobile">Mobile</label>
          <input
            onChange={handleChange}
            id="mobile"
            autoComplete="tel"
            type="tel"
            name="mobile"
            value={signupInfo.mobile}
            placeholder="Enter your mobile..."
          />
        </div>

        <button type="submit">Signup</button>

        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Signup;



// Old version of signup function 
// function Signup() {
//     //.................................................................................
//     const [signupInfo, setSignupInfo] = useState({
//         name: '',
//         email:'',
//         password: '',
//         mobile: ''
//     })
//     //................................Calling HOok .............

//     //.........................................................
//     const handleChange = (e)=>{
//         // console.log(e)
//          const {name, value} = e.target;               
//         // console.log(name,value);                            //>>>>>> sending Value
//          const copySignupInfo = {...signupInfo}            // console.log(copySignupInfo)       //>>>>>>  Sending Objecct .............
//          copySignupInfo[name] = value;                    //  console.log(value)               //>>>>>>> sending name and store in value
//          setSignupInfo (copySignupInfo);
//         //setSignupInfo(signupInfo => ({...signupInfo, [name]: value}))     // 

//     }
//              console.log('........ User signup ki Information : ',signupInfo)
//              //.......................... Page Refresh Rokne k liye >>>>    handleSignup ko form me call krenges......................
//              const handleSignup = async(e)=>{
//                 e.preventDefault();
//                 //.............................Signup Logic .............................
//                 const{name,email,password,mobile} = signupInfo;             // console.log(signupInfo)
//                 if(!name || !email || !password || !mobile)
//                     {
//                    return handleError (" Please Filled are required Fields ")
//                     return console.log(" if dataaaaaaaa  : , ",signupInfo)
//                     // alert(" Please Filled are required Fields ")
//                 }
//                 try {
//                     const url =('http://localhost:8080/auth/signup');
//                     const response = await fetch (url,{
//                         method : 'POST',
//                         headers : {
//                             'Content-Type' : 'application/json'
//                         },
//                         body: JSON.stringify(signupInfo)
//                     })
//                     console(" My Response is : ", response)
//                     // const result = await response.json();
//                     // console.log(' Signup Result : ', result);

//                 } catch (error) {
//                     handleError(error)
//                 }
//              }
//     //...................................................................................

//   return (
//     <div className='container'>
//         <h1>Signup</h1>
//         <form onSubmit={handleSignup}>
//             <div>
//                 <label htmlFor='name'> Name </label>
//                 <input 
//                         //onChange={e => setSignupInfo(e.target.value)}           // input type working
//                         onChange={handleChange}                      // calling handleChange function but show error
//                         id='uname'
//                         autoComplete='uname'
//                         type='text' 
//                         name='name' 
//                         value={signupInfo.name}                             // for collecting name information 
//                         autoFocus 
//                         placeholder='Enter your Name....'
//                 />
//             </div>
//              <div>
//                 <label htmlFor='email'> Email </label>
//                 <input 
//                         // onChange={e => setSignupInfo(e.target.value)}                             // input type working
//                          onChange={handleChange}
//                           id='email'
//                         autoComplete='email'
//                         type='email' 
//                         name='email' 
//                         value={signupInfo.email}                             // for collecting email information
//                  placeholder='Enter your email....'
//                 />
//             </div>
//             <div>
//                 <label htmlFor='password'> Password </label>
//                 <input 
//                          //onChange={e => setSignupInfo(e.target.value)}                             // input type working
//                          onChange={handleChange}
//                          id='new-password'
//                          autoComplete='new-password'
//                         type='password' 
//                         name='password' 
//                          value={signupInfo.password}                             // for collecting password information
//                  placeholder='Enter your password....'
//                 />
//             </div>
//             <div>
//                 <label htmlFor='mobile'> Mobile </label>
//                 <input 
//                          //onChange={e => setSignupInfo(e.target.value)}                             // input type working
//                          onChange={handleChange}
//                          id='mobile'
//                         autoComplete='tel'
//                         type='tel' 
//                         name='mobile' 
//                         value={signupInfo.mobile}                             // for collecting mobile information
//                  placeholder='Enter your mobile....'
//                 />
//             </div>
//             <button type='submit'> Signup </button>
//             <span> Already have an account ? 
//                 <Link to ='/login'> Login</Link>
//             </span>
//         </form>
//         <ToastContainer/>
//     </div>
//   )
// }

// export default Signup
