import React from 'react'
import Navbar from '../../components/Navbar'

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='h-full'>
        {/* header */}
        <header>
            <Navbar />
        </header>

        {/* sidebar */}
        <div></div>

        <main>{children}</main>
    </div>
  )
}

export default DashboardLayout