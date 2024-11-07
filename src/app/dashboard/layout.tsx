import React from 'react'
import DashboardNavbar from './_components/DashboardNavbar'
import {DashboardSidebar} from './_components/DashboardSidebar'
import { ChakraProvider } from '@chakra-ui/react'

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <ChakraProvider>
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
            <main className='w-full'>{children}</main>
        </div>

    </div>
    </ChakraProvider>
  )
}

export default DashboardLayout