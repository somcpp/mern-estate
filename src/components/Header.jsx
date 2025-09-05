import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectLoggedInUser } from '../redux/auth/authSlice'

const Header = () => {
  const dispatch = useDispatch();
  let user = useSelector(selectLoggedInUser)
  user = user.loggedInUser;
  // console.log(user);
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to = '/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
          <span className='text-slate-500'>Som</span>
          <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>
        
      
      
      <form className='bg-slate-100 p-3 rounded-lg items-center'>
        <input type='text' placeholder='search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
        <FaSearch className='text-slate-600' />
      </form>
      <ul className='flex gap-4'>
        <Link to='/'>
          <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
        </Link>
        <Link to='/about'>
          <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
        </Link>
        {/* {user && (
          <Link to='sign-in'>
          <li onClick={dispatch(signout())}  className='hidden sm:inline text-slate-700 hover:underline hover:cursor-pointer hover:text-red-500 '>Sign out</li>
          </Link>
        )} */}
        {user? (
          <Link to= '/profile'>
          <img src={user.avatar} className='rounded-full h-7 w-7 object-cover' alt="profile" />
        </Link>
        ) : <Link to='sign-in'>
          <li className='hidden sm:inline text-slate-700 hover:underline'>Sign in</li>
        </Link>}
        
        
         
      </ul>
      </div>
    </header>
  )
}

export default Header
