import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  User, 
  Settings, 
  LogOut, 
  X, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import Header from '../components/Header';

// --- MOCK DATA ---
const JOBS_DATA = [
  { id: 1, title: 'Senior Full Stack Dev', company: 'TechFlow', location: 'Remote', salary: '$120k - $150k', type: 'Full-time', description: 'We are looking for a MERN stack expert to lead our core team. You will be working with React, Node.js, and AWS.' },
  { id: 2, title: 'Frontend Engineer', company: 'Creative AI', location: 'San Francisco, CA', salary: '$110k - $135k', type: 'Contract', description: 'Focus on building beautiful interfaces using GSAP and Three.js. Experience with 3D web design is a plus.' },
  { id: 3, title: 'Backend Architect', company: 'DataSystems', location: 'New York, NY', salary: '$140k - $180k', type: 'Full-time', description: 'Scale our Node.js microservices and optimize MongoDB aggregation pipelines.' },
  { id: 4, title: 'AI Prompt Engineer', company: 'AutoJob AI', location: 'Remote', salary: '$90k - $120k', type: 'Part-time', description: 'Help fine-tune our LLMs for resume generation and cover letter tailoring.' },
  { id: 5, title: 'React Native Dev', company: 'MobileFirst', location: 'Austin, TX', salary: '$115k - $140k', type: 'Full-time', description: 'Build cross-platform mobile apps for our logistics platform.' },
  { id: 6, title: 'DevOps Engineer', company: 'CloudScale', location: 'Remote', salary: '$130k - $160k', type: 'Full-time', description: 'Manage CI/CD pipelines, Docker containers, and Kubernetes clusters.' },
];

const UserHome = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden">
      
     <Header/>

      {/* --- MAIN CONTENT --- */}
      <main className="pt-24 px-6 pb-10 max-w-7xl mx-auto">
        
        {/* Header & Search */}
        <div className="mb-10 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Find your next role</h1>
              <p className="text-gray-400">We found <span className="text-purple-400 font-semibold">{JOBS_DATA.length}</span> jobs matching your profile.</p>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search by title, skill, or company..." 
                className="w-full bg-[#161616] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-600"
              />
            </div>
            <button className="bg-[#161616] border border-white/10 hover:bg-white/5 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </motion.div>
        </div>

        {/* Job Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {JOBS_DATA.map((job) => (
            <motion.div
              key={job.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.03)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedJob(job)}
              className="bg-[#111] border border-white/5 rounded-2xl p-6 cursor-pointer hover:border-purple-500/30 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="text-purple-500 w-5 h-5" />
              </div>
              
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">{job.title}</h3>
                <p className="text-gray-400 text-sm">{job.company}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300 border border-white/5">{job.type}</span>
                <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300 border border-white/5">{job.location}</span>
              </div>

              <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
                <DollarSign className="w-4 h-4" />
                {job.salary}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* --- SLIDE OVER PANEL (Detailed Info) --- */}
      <AnimatePresence>
        {selectedJob && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Slide Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full md:w-125 bg-[#0f0f0f] border-l border-white/10 z-50 shadow-2xl p-8 overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedJob(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>

              <div className="mt-8">
                <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                   <Briefcase className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-3xl font-bold text-white mb-2">{selectedJob.title}</h2>
                <div className="flex items-center gap-2 text-purple-400 text-lg mb-6">
                   <span>{selectedJob.company}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5">
                    <p className="text-gray-500 text-xs mb-1">Salary</p>
                    <p className="text-white font-medium">{selectedJob.salary}</p>
                  </div>
                  <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5">
                    <p className="text-gray-500 text-xs mb-1">Location</p>
                    <p className="text-white font-medium">{selectedJob.location}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Job Description</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {selectedJob.description}
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>

                <div className="mt-10 pt-6 border-t border-white/10">
                    <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Auto-Apply with AI
                    </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default UserHome;