import commonAPI from "./commonAPI";
import serverURL from "./serverURL";

//user register api
export const registerAPI = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/register`, reqBody);
};

//user login api
export const loginAPI = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/login`, reqBody);
};

//user google login api
export const googleLoginAPI = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/google-login`, reqBody);
};

//getuser
export const getUserAPI = async (id, reqHeader) => {
  return await commonAPI("GET", `${serverURL}/user/${id}`, {}, reqHeader);
};

//getJobs
export const getJobsAPI = async (id, reqHeader) => {
  return await commonAPI("GET", `${serverURL}/user/${id}`, {}, reqHeader);
};

//user/:id/edit - put request by edit component when update btn clicked
export const editUserAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${serverURL}/user/${id}/edit`,
    reqBody,
    reqHeader,
  );
};

//user upload resumes
export const uploadResumeAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${serverURL}/user/${id}/resume`,
    reqBody,
    reqHeader,
  );
};

//user all jobs
export const userAllJobs = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/candidate/jobs`, {}, reqHeader);
};

//payment
export const verifyPaymentAPI = async (planData, reqHeader) => {
 
  return await commonAPI("PUT", `${serverURL}/users/payment`, planData, reqHeader);
};

//get current User
export const getCurrentUserAPI = async (reqHeader) => {
  return await commonAPI("GET",`${serverURL}/users/me`,"",reqHeader);
};

//automatic resume fill
export const autoFillProfileAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST",`${serverURL}/user/auto-fill-profile`,reqBody,reqHeader
  );
};

//add job
export const addJobAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST",`${serverURL}/user/add/job`,reqBody,reqHeader);
};

//recruiters get my job
export const getMyJobsAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST",`${serverURL}/recruiter/my-jobs`,reqBody,reqHeader);
};

//recruiter get applicants for each job
export const getJobApplicants = async (jobId, reqBody, reqHeader) => {
  return await commonAPI("POST",`${serverURL}/recruiter/applicants/${jobId}`,reqBody,reqHeader);
};

//recruiter delete job
export const deleteJobAPI = async (jobId, reqBody, reqHeader) => {
  return await commonAPI("DELETE",`${serverURL}/recruiter/job/${jobId}`,reqBody,reqHeader);
};

//recruiter delete application
export const deleteApplicationAPI = async (applicationId,reqBody,reqHeader,) => {
  return await commonAPI("DELETE",`${serverURL}/recruiter/application/${applicationId}`,reqBody,reqHeader);
};

//recruiter dashboard counts and and list first few applicants to that recruiter
export const recruiterDashboardAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST",`${serverURL}/recruiter/dashboard`,reqBody,reqHeader);
};

// chatbot api
export const chatBotAPI = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/api/chat`, reqBody, {
    "Content-Type": "application/json",
  });
};

//candidate apply job
export const applyJobAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST",`${serverURL}/application/apply`,reqBody,reqHeader);
};

//admin dashboard
export const adminDashboardAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/admin/dashboard`, "", reqHeader);
};

//admin all users
export const adminGetUsersAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/admin/users`, "", reqHeader);
};

//admin users delete
export const adminDeleteUserAPI = async (userId, reqHeader) => {
  return await commonAPI("DELETE",`${serverURL}/admin/user/${userId}`,"",reqHeader);
};

//recruiter accept
export const acceptApplicationAPI = async (applicationId,reqBody,reqHeader,) => {
  return await commonAPI("PUT",`${serverURL}/recruiter/application/accept/${applicationId}`,reqBody,reqHeader);
};

//admin get all jobs
export const adminGetJobsAPI = async (reqHeader) =>
  commonAPI("GET", `${serverURL}/admin/jobs`, "", reqHeader);

//admin get all applications
export const adminGetApplicationsAPI = async (reqHeader) =>
  commonAPI("GET", `${serverURL}/admin/applications`, "", reqHeader);

//admin delete jobs
export const adminDeleteJobAPI = async (jobId, reqHeader) =>
  commonAPI("DELETE", `${serverURL}/admin/job/${jobId}`, "", reqHeader);

//admin delete application
export const adminDeleteApplicationAPI = async (applicationId, reqHeader) =>
  commonAPI("DELETE",`${serverURL}/admin/application/${applicationId}`,"",reqHeader,
  );

//admin dashboard report
export const adminDownloadReportAPI = async (reqHeader) =>
  commonAPI("GET", `${serverURL}/admin/dashboard/report`, "", reqHeader);
