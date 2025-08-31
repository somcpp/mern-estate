import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../firebase'
import { useDispatch } from "react-redux";
import { googleAsync } from "../redux/auth/authSlice";
import {useNavigate } from "react-router-dom";
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleGoogleClick = async () => {
    try {
      const Provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, Provider);
      console.log(result)
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      }
      await dispatch(googleAsync(userData)).unwrap();
      navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  }
  return (
    <button onClick={handleGoogleClick} type='button' className=' bg-green-500 text-white p-3 rounded-lg uppercase hover:bg-green-600 transition-all hover: cursor-pointer'>Continue with google</button>
  )
}

export default OAuth
