import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans overflow-hidden">
        
      {/* Background Gradient Overlay */}
      <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent">
          {children}
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;