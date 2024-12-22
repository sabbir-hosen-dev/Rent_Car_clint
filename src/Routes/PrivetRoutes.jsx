import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../Hook/useAuthContext"



// eslint-disable-next-line react/prop-types
function PrivetRoute({children}) {
  const {user} = useAuthContext();

  const location = useLocation();
  
  if(!user.email){
    return <Navigate to="/login" state={{form : location.pathname}} />
  }

  return children
}

export default PrivetRoute