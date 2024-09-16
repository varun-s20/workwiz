import React from 'react'
import DashboardNavbar from './_components/DashboardNavbar'
import {DashboardSidebar} from './_components/DashboardSidebar'

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='h-full'>
        {/* header  */}
        <header>
            <DashboardNavbar />
        </header>
        
        {/* sidebar */}
        <div className='flex'>
            <div>
                <DashboardSidebar />
            </div>
            <main className='p-10'>{children}</main>
        </div>

    </div>
  )
}

export default DashboardLayout