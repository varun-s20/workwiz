import Navbar from '../../components/Navbar'
import React from 'react'

const AuthenticationLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
        <Navbar />
        <div className='h-screen flex items-center justify-center bg-[#0b0b0f]'>
            {children}
        </div>
    </>
  )
}

export default AuthenticationLayout