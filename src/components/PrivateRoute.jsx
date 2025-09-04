import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"



const PrivateRoute = () => {
  const {loggedInUser} = useSelector((state) => state.user);
  // console.log(loggedInUser);
  return loggedInUser ?  <Outlet /> : <Navigate to = '/sign-in'/>;
}

export default PrivateRoute
