import React from 'react'

function Footer() {
  return (
    <div className="bg-gray-800 text-gray-400 text-center py-4 text-sm border-t border-gray-700">
      &copy; {new Date().getFullYear()} AutoJob AI. All rights reserved.
    </div>
  )
}

export default Footer