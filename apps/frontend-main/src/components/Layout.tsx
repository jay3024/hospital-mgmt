import Header from './Header'
import LayoutHeader from './LayoutHeader'
import Sidebar from './Sidebar'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <LayoutHeader toggleSidebar={toggleSidebar} />

        {/* Content Area */}
        <main className="flex-grow p-6 overflow-auto">
          <Outlet /> {/* This is where child components will render */}
        </main>
      </div>
    </div>
  )
}

export default Layout
