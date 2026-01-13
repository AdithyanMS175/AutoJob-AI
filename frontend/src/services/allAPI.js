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
  return await commonAPI("GET", `${serverURL}/user/${id}`,{},reqHeader);
};


//getJobs
export const getJobsAPI = async (id, reqHeader) => {
  return await commonAPI("GET", `${serverURL}/user/${id}`,{},reqHeader);
};


//user/:id/edit - put request by edit component when update btn clicked
export const editUserAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI("PUT",`${serverURL}/user/${id}/edit`,reqBody,reqHeader);
};

//user upload resumes
export const uploadResumeAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI("PUT",`${serverURL}/user/${id}/resume`,reqBody,reqHeader);
};

//user all jobs
export const userAllJobs = async (reqHeader) => {
  return await commonAPI("GET",`${serverURL}/candidate/jobs`,{},reqHeader);
};


//add job
export const addJobAPI = async (reqBody,reqHeader) => {
    return await commonAPI("POST",`${serverURL}/user/add/job`,reqBody,reqHeader)
}

//recruiters get my job
export const getMyJobsAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST",`${serverURL}/recruiter/my-jobs`,reqBody,reqHeader);
};

// chatbot api
export const chatBotAPI = async (reqBody) => {
  return await commonAPI("POST",`${serverURL}/api/chat`,reqBody,{ "Content-Type": "application/json" });
};

