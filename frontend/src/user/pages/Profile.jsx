import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    FileText,
    CreditCard,
    MessageSquare,
    Bell,
    Shield,
    Upload,
    Save,
    Mail,
    ChevronRight
} from 'lucide-react';
import React from 'react'
import InputGroup from '../components/InputGroup';





function Profile() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">Profile Information</h3>
        <p className="text-gray-400">Update your photo and personal details here.</p>
      </div>

      <div className="flex items-center gap-6 pb-6 border-b border-white/5">
        <div className="w-24 h-24 rounded-full bg-linear-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
          JD
        </div>
        <div>
          <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Change Avatar</button>
          <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
        </div>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="First Name" placeholder="John" />
          <InputGroup label="Last Name" placeholder="Doe" />
        </div>
        <InputGroup label="Email Address" placeholder="john.doe@example.com" type="email" />
        <InputGroup label="Job Title" placeholder="Full Stack Developer" />

        <div className="pt-4">
          <button type="button" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default Profile