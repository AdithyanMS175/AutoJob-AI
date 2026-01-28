import React, { useContext, useEffect, useState } from 'react';
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
import ChatBot from '../components/ChatBot/ChatBot/ChatBot';
import { applyJobAPI, userAllJobs } from '../../services/allAPI';
import { toast, ToastContainer } from 'react-toastify';
import { isProfileComplete } from '../utils/isProfileComplete';



const UserHome = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [allJobs, setAllJobs] = useState([])
  const [filters, setFilters] = useState({
    category: 'All',
    location: 'All',
    minSalary: 0
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [user, setUser] = useState(null)

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

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const user = sessionStorage.getItem("user");
      setUser(JSON.parse(user))
      fetchJobs(token);
    }


  }, [])

  if (user && user.isVerified) {
    console.log(user.isVerified)
  }



  const fetchJobs = async (token) => {

    if (token) {

      try {
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }

        const result = await userAllJobs(reqHeader);

        setAllJobs(result.data);


      } catch (err) {
        console.log(err);

      }


    } else {
      console.log('token Not found');

    }



  }



  const filteredJobs = allJobs.filter(job => {
    // 1. Text Search Logic (Title or Skills)
    const matchesSearch =
      job.jobTitle?.toLowerCase().includes(searchKey.toLowerCase()) ||
      job.skills?.some(skill => skill.toLowerCase().includes(searchKey.toLowerCase()));

    // 2. Category Filter
    const matchesCategory = filters.category === 'All' || job.category === filters.category;

    // 3. Location Filter
    const matchesLocation = filters.location === 'All' || job.location?.toLowerCase() === filters.location.toLowerCase();

    const salaryNumber = Number(job.salary);
    const matchesSalary =
      isNaN(salaryNumber) || salaryNumber >= filters.minSalary;

    return matchesSearch && matchesCategory && matchesLocation && matchesSalary;
  });


  const handleApplyJob = async (id) => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log(id);
    console.log(user._id);

    if (!token) {
      toast.error("Please login to apply");
      return;
    }

    if (!isProfileComplete(user)) {
      toast.warning("Please complete your profile before applying");
      return;
    }

    const reqBody = {
      jobId: id,
      userId: user._id,
      resume: user.resume,
    };

    const reqHeader = {
      Authorization: `Bearer ${token}`
    };

    try {
      const result = await applyJobAPI(reqBody, reqHeader);

      if (result.status === 200 || result.status === 201) {
        toast.success("Applied successfully");
        setSelectedJob(null);
      } else if (result.status === 409) {
        toast.warning("You already applied for this job");
      } else {
        toast.error("Application failed");
      }


    } catch (err) {
      toast.error("Unexpected error");
      console.log(err);



    }
  };



  console.log(allJobs);

  return (
    <>
      <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden">

        <Header />

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
                <p className="text-gray-400">We found <span className="text-purple-400 font-semibold">{allJobs.length}</span> jobs matching your profile.</p>
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
                  value={searchKey} // Bind value to context state
                  onChange={(e) => setSearchKey(e.target.value)} // Update context on change
                  className="w-full bg-[#161616] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-600"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="bg-[#161616] border border-white/10 hover:bg-white/5 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all"
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
                  {(filters.category !== 'All' || filters.minSalary > 0) && (
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  )}
                </button>

                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-72 bg-[#0f0f0f] border border-white/10 rounded-2xl p-5 shadow-2xl z-50"
                    >
                      {/* Category Section */}
                      <div className="mb-6">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Category</label>
                        <select
                          value={filters.category}
                          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                          className="w-full bg-[#1a1a1a] border border-white/5 rounded-lg p-2 text-sm text-white outline-none focus:ring-1 focus:ring-purple-500"
                        >
                          <option value="All">All Categories</option>
                          {allJobs.map(job =>
                            <option value={job.category}>{job.category}</option>)}

                        </select>
                      </div>


                      <div className="mb-6">
                        <div className="flex justify-between mb-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Min Salary</label>
                          <span className="text-xs text-purple-400">₹{filters.minSalary}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100000"
                          step="5000"
                          value={filters.minSalary}
                          onChange={(e) => setFilters({ ...filters, minSalary: Number(e.target.value) })}
                          className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                      </div>


                      <button
                        onClick={() => {
                          setFilters({ category: 'All', location: 'All', minSalary: 0 });
                          setIsFilterOpen(false);
                        }}
                        className="w-full py-2 text-xs font-medium text-gray-400 hover:text-white border border-white/5 rounded-lg hover:bg-white/5 transition-all"
                      >
                        Reset All Filters
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>





            </motion.div>
          </div>

          {/* Job Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <motion.div
                  key={job._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.03)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedJob(job)}
                  className="bg-[#111] border border-white/5 rounded-2xl p-6 cursor-pointer hover:border-purple-500/30 transition-colors group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="text-purple-500 w-5 h-5" />
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">{job.jobTitle}</h3>
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
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                No jobs found matching "{searchKey}"
              </div>
            )}
          </motion.div>
        </main>


        <AnimatePresence>
          {selectedJob && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedJob(null);
                }}
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

                  <h2 className="text-3xl font-bold text-white mb-2">{selectedJob.jobTitle}</h2>
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

                  </div>

                  <div className="mt-10 pt-6 border-t border-white/10">
                    <button onClick={(e) => { e.stopPropagation(); handleApplyJob(selectedJob._id) }} className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Apply For this Job

                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
                
        {user && user?.isVerified  && 
          <ChatBot />
        }


      </div>

      <ToastContainer position='top-center' autoClose={3000} theme='colored' />

    </>
  );
};

export default UserHome;