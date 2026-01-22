export const isProfileComplete = (user) => {
  if (!user) return false;

  const requiredFields = [
    user.username,
    user.email,
    user.phone,
    user.resumes,
    user.skills && user.skills.length > 0,
    user.education && user.education.length > 0, 
  ];

  return requiredFields.every(Boolean);
};