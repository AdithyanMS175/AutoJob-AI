import React from 'react'

function Header() {
  return (
    <header className="bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center border-b border-gray-700">
      <h2 className="text-xl font-bold text-white">Dashboard</h2>
      
      <div className="flex items-center gap-4">
        <button className="text-gray-300 hover:text-white">Notifications</button>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </header>
  )
}

export default Header