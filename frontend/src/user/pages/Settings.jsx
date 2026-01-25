import React, { useState } from 'react';
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
    ChevronRight,
    House
} from 'lucide-react';
import Profile from './Profile';
import BillingSection from './BillingSection';
import SupportSection from './SupportSection';
import ResumeSettings from './ResumeSettings';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChatBot from '../components/ChatBot/ChatBot/ChatBot';

// --- SECTIONS CONFIGURATION ---
const MENU_ITEMS = [
    { id: 'profile', label: 'Profile & Personal Info', icon: User, description: 'Manage your personal details' },
    { id: 'resume', label: 'Resume & AI Context', icon: FileText, description: 'Upload resume and set AI preferences' },
    { id: 'billing', label: 'Subscription & Credits', icon: CreditCard, description: 'Manage your premium plan' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Email and push preferences' },
    { id: 'support', label: 'Contact & Support', icon: MessageSquare, description: 'Get help or report an issue' },
];

const Settings = () => {

    const [activeTab, setActiveTab] = useState('profile');
    const navigate = useNavigate();
    const [user,setUser] = useState()

    useState(()=>{
        const user = sessionStorage.getItem("user");
        setUser(JSON.parse(user));

    },[])

    const Logout = () => {
        sessionStorage.clear("user")
        sessionStorage.clear("token")
        navigate('/login')
        toast.success("Logged Out Successfully");

    }

    const handleHome = () => {
        navigate('/user/home')
    }
    




    return (
        <div className="flex h-screen bg-[#0a0a0a] text-gray-100 font-sans overflow-hidden">


            <aside className="w-64 lg:w-72 bg-[#111] border-r border-white/5 flex flex-col">
                <div className="p-8">
                    <House className="mb-3 hover:text-purple-400 cursor-pointer" onClick={handleHome} />
                    <h2 className="text-2xl font-bold text-white mb-1">Settings</h2>
                    <p className="text-sm text-gray-500">Manage your account</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {MENU_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center cursor-pointer gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${isActive
                                    ? 'bg-purple-600/10 text-purple-400'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute left-0 w-1 h-6 bg-purple-500 rounded-r-full"
                                    />
                                )}
                                <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'text-gray-500 group-hover:text-white'}`} />
                                <div className="text-left">
                                    <span className="block text-sm font-medium">{item.label}</span>
                                </div>
                            </button>
                        );
                    })}
                </nav>

                <div onClick={Logout} className="p-3 text-xs  text-center text-white mb-3 border-purple-500 rounded-full bg-purple-500 cursor-pointer hover:bg-red-400 hover:text-white">
                    Logout
                </div>
            </aside>


            <main className="flex-1 overflow-y-auto p-8 lg:p-12">
                <div className="max-w-3xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ContentSection type={activeTab} />
                            {user?.isVerified && 
                            <ChatBot />
                            }
                        
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};


const ContentSection = ({ type }) => {
    switch (type) {
        case 'profile':
            return <Profile />;
        case 'resume':
            return <ResumeSettings />;
        case 'support':
            return <SupportSection />;
        case 'billing':
            return <BillingSection />;
        default:
            return <div className="text-gray-500">Section under construction...</div>;
    }
};











export default Settings;