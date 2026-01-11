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

//user/:id/edit - put request by edit component when update btn clicked
export const editUserAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI("PUT",`${serverURL}/user/${id}/edit`,reqBody,reqHeader);
};

//user upload resumes
export const uploadResumeAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI("PUT",`${serverURL}/user/${id}/resume`,reqBody,reqHeader);
};


//add job
export const addJobAPI = async (reqBody,reqHeader) => {
    return await commonAPI("POST",`${serverURL}/user/add/job`,reqBody,reqHeader)
}

