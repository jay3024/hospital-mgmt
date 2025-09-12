import React from 'react'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="bg-card backdrop-blur-lg border-b border-border sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <Logo size="md" />
        </div>

        {/* Theme Toggle and Additional Actions */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {/* Additional links or buttons can go here */}
        </div>
      </div>
    </header>
  )
}
