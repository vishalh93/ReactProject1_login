import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("Token");

    if (token) {
      setIsAuthenticated(true);

      // Prevent going back to login/signup if already logged in
      if ( location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/" )
         {
          navigate("/home", { replace: true });
        }
    } else {
           setIsAuthenticated(false);

         // Redirect to login if not authenticated
          if (location.pathname !== "/login" && location.pathname !== "/signup") {
            navigate("/login", { replace: true });
          }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;


// import { useEffect } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'

// function RefreshHandler({setIsAuthenticated}) {
//             const location = useLocation();
//             const navigate = useNavigate();
//             useEffect(()=>{
//                 setIsAuthenticated(true);
//                 if(location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/'){
//                     navigate('/home', {replace:false});
//                 }
//             },[location, navigate, setIsAuthenticated])

//   return (
//     null
//   )
// }

// export default RefreshHandler;
