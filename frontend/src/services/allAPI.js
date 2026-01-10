import commonAPI from "./commonAPI"
import serverURL from "./serverURL"

export const registerAPI = async (reqBody) => {
    return await commonAPI("POST",`${serverURL}/register`,reqBody)
}

export const loginAPI = async (reqBody) => {
    return await commonAPI("POST",`${serverURL}/login`,reqBody)
}

export const googleLoginAPI = async (reqBody) => {
    return await commonAPI("POST",`${serverURL}/google-login`,reqBody)
}

export const getUserAPI = async (id,reqBody) => {
    return await commonAPI("POST",`${serverURL}/google-login`,reqBody)
}