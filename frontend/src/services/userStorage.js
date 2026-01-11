export const getStoredUser = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setStoredUser = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};