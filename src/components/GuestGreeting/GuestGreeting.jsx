import React from 'react'
import RegisterControl from '../RegisterControl/RegisterControl';


const GuestGreeting = ({setUser, setAuthState}) => {
  return (
    <div className='flex w-full h-screen'>
      <div className='w-full flex items-center justify-center lg:w-1/2'>
        <RegisterControl setAuthState={setAuthState} setUser={setUser}/>
      </div>
      <div className='hidden w-1/2 relative lg:flex items-center justify-center h-full bg-gray-200'>
        <div className='animate-bounce'><img src="./american.png" alt="" /></div>
      </div>
    </div>
  )
}

export default GuestGreeting