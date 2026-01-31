import { useContext, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import Auth from './pages/Auth'
import Home from './user/pages/Home'
import Profile from './user/pages/Profile'
import Pnf from './pages/Pnf'
import Settings from './user/pages/Settings'
import RecruiterDashboard from './recruiter/pages/RecruiterDashboard'
import RecruiterLayout from './recruiter/components/RecruiterLayout'
import PostJob from './recruiter/pages/PostJob'
import AIMatchBadge from './recruiter/components/AIMatchBadge'
import ApplicantTable from './recruiter/components/ApplicationTable'
import JobCard from './recruiter/pages/JobCard'
import StatusDropdown from './recruiter/components/StatusDropdown'
import StatsWidget from './recruiter/components/StatsWidget'
import AdminHome from './admin/pages/AdminHome'
import MyJobs from './recruiter/pages/MyJobs'
import AdminLayout from './admin/components/AdminLayout'
import AdminUsers from './admin/pages/AdminAllUserPage'
import AdminManageJobs from './admin/pages/AdminManageJobs'
import RecruiterProfile from './recruiter/pages/RecruiterProfile'
import PaymentSuccess from './user/pages/BillingSuccess'
import PaymentFailure from './user/pages/BillingFailure'
import MyApplications from './user/pages/MyApplications'
import AdminComplaints from './admin/pages/AdminComplaints'
import { routeGuardContext } from './contextAPI/AuthContext'

function App() {
  const { role, authorisedUser, setAuthorisedUser } = useContext(routeGuardContext);

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/signup' element={<Auth registerURL={true} />} />

        {/* user  */}
        {role == "candidate" && <>
          <Route path='/user/home' element={<Home />} />
          <Route path='/user/profile' element={<Profile />} />
          <Route path='/user/settings' element={<Settings />} />
          <Route path="/billing/success" element={<PaymentSuccess />} />
          <Route path="/billing/cancel" element={<PaymentFailure />} />
          <Route path="/user/myapplications" element={<MyApplications />} />
        </>}


        {/* recruiter  */}
        {role == "recruiter" &&

          <Route path='/recruiter' element={<RecruiterLayout />} >
            <Route path='home' element={<RecruiterDashboard />} />
            <Route path='post-job' element={<PostJob />} />
            <Route path='aimatchbadge' element={<AIMatchBadge />} />
            <Route path='applicationtable' element={<ApplicantTable />} />
            <Route path='my-jobs' element={<MyJobs />} />
            <Route path='my-profile' element={<RecruiterProfile />} />

            <Route path='jobcard' element={<JobCard />} />
            <Route path='statusdropdown' element={<StatusDropdown />} />
            <Route path='statuswidget' element={<StatsWidget />} />

          </Route>

        }

        {role == "admin" &&
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="home" element={<AdminHome />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="jobs" element={<AdminManageJobs />} />
            <Route path="complaints" element={<AdminComplaints />} />
          </Route>

        }






        <Route path="/*" element={<Pnf />} />
      </Routes>
    </>
  )
}

export default App
