import { getCurrentUserAPI } from "./allAPI";

export const getStoredUser = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setStoredUser = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};


export const getUser = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) return null;

  try {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const res = await getCurrentUserAPI(reqHeader);

    if (res.status === 200 && res.data) {
      setStoredUser(res.data);
      return res.data;
    }
  } catch (err) {
    console.error("Failed to fetch user:", err);
  }

  return null;
};