import React from 'react'
import ThemeToggle from './ThemeToggle'
import { User, CircleUser, Menu } from 'lucide-react'

export default function LayoutHeader({ toggleSidebar }) {
  return (
    <header className="bg-card backdrop-blur-lg border-b border-border sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between lg:justify-end items-center">
        {/* Hamburger Menu for Small Screens */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleSidebar} className="text-sidebar-foreground">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Theme Toggle and User Info */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="flex p-2 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-all duration-200 shadow-sm flex space-x-4">
            <CircleUser />
            <p>Admin</p> 
          </div>
        </div>
      </div>
    </header>
  )
}
