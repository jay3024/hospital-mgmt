import { Link } from 'react-router-dom'
import { Home, Calendar, Stethoscope, Heart, Settings, User, Menu, LogOut } from 'lucide-react'
import Logo from './Logo'
import { useState } from 'react'

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div>
      {/* Sidebar for Small Screens (hidden initially) */}
     

      <div
        className={`fixed inset-0 z-50 bg-[#fff] dark:bg-[#0e1525]  transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:hidden`}
      >
        <div className="bg-sidebar h-full flex flex-col p-5">
          <Logo size="sm" className="" />

          <nav className="flex-grow px-4 py-6 space-y-6">
            <ul className="space-y-4">
              {/* Menu items */}
              <li>
                <Link
                  to="/health-tracker"
                  onClick={toggleSidebar} // Close sidebar on click
                  className="flex items-center space-x-3 text-sidebar-foreground hover:text-primary px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-sidebar-accent"
                >
                  <Heart className="w-5 h-5" />
                  <span>Health Tracker</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/appointments"
                  onClick={toggleSidebar} // Close sidebar on click
                  className="flex items-center space-x-3 text-sidebar-foreground hover:text-primary px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-sidebar-accent"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Appointments</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/consultation"
                  onClick={toggleSidebar} // Close sidebar on click
                  className="flex items-center space-x-3 text-sidebar-foreground hover:text-primary px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-sidebar-accent"
                >
                  <Stethoscope className="w-5 h-5" />
                  <span>Consultation</span>
                </Link>
              </li>
             
              <li>
                <Link
                  to="/mental-health"
                  onClick={toggleSidebar} // Close sidebar on click
                  className="flex items-center space-x-3 text-sidebar-foreground hover:text-primary px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-sidebar-accent"
                >
                  <User className="w-5 h-5" />
                  <span>Mental Health</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/pharmacy"
                  onClick={toggleSidebar} // Close sidebar on click
                  className="flex items-center space-x-3 text-sidebar-foreground hover:text-primary px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-sidebar-accent"
                >
                  <Heart className="w-5 h-5" />
                  <span>Pharmacy</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  onClick={toggleSidebar} // Close sidebar on click
                  className="flex items-center space-x-3 text-sidebar-foreground hover:text-primary px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-sidebar-accent"
                >
                  <Settings className="w-5 h-5" />
                  <span>Admin Panel</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/signin"
                  onClick={toggleSidebar} // Close sidebar on click
                  className="flex items-center space-x-3 text-sidebar-foreground hover:text-primary px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-sidebar-accent"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

    
    

     

      {/* Sidebar for Medium and Large Screens */}
      <div className="bg-[#fff] dark:bg-[#0e1525] hidden md:block w-64 bg-sidebar h-full flex flex-col p-5 shadow-lg">
        <Logo size="md" className="mb-8" />

        <nav className="flex-grow px-4 py-6 space-y-6">
          <ul className="space-y-4">
            <li>
              <Link
                to="/health-tracker"
                className="flex items-center space-x-3 text-sidebar-foreground hover:text-primary px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-sidebar-accent"
              >
                <Heart className="w-5 h-5" />
                <span>Health Tracker</span>
              </Link>
            </li>
            <li>
              <Link
                to="/appointments"
                className="flex items-center space-x-3 text-sidebar-foreground hover:text-primary px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-sidebar-accent"
              >
                <Calendar className="w-5 h-5" />
                <span>Appointments</span>
              </Link>
            </li>
            <li>
              <Link
                to="/consultation"
                className="flex items-center space-x-3 text-sidebar-foreground hover:text-primary px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-sidebar-accent"
              >
                <Stethoscope className="w-5 h-5" />
                <span>Consultation</span>
              </Link>
            </li>
           
            <li>
              <Link
                to="/mental-health"
                className="flex items-center space-x-3 text-sidebar-foreground hover:text-primary px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-sidebar-accent"
              >
                <User className="w-5 h-5" />
                <span>Mental Health</span>
              </Link>
            </li>
            <li>
              <Link
                to="/pharmacy"
                className="flex items-center space-x-3 text-sidebar-foreground hover:text-primary px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-sidebar-accent"
              >
                <Heart className="w-5 h-5" />
                <span>Pharmacy</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="flex items-center space-x-3 text-sidebar-foreground hover:text-primary px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-sidebar-accent"
              >
                <Settings className="w-5 h-5" />
                <span>Admin Panel</span>
              </Link>
            </li>
             <li>
                <Link
                  to="/signin"
                  onClick={toggleSidebar} // Close sidebar on click
                  className="flex items-center space-x-3 text-sidebar-foreground hover:text-primary px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-sidebar-accent"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </Link>
              </li>
          </ul>
        </nav>
      </div>

      {/* Backdrop to close sidebar */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'} sm:pointer-events-none`}
      />
    </div>
  )
}
