export const isProfileComplete = (user) => {
  if (!user) return false;

  const requiredFields = [
    user.name,
    user.email,
    user.phone,
    user.resume,
    user.skills && user.skills.length > 0,
    user.education && user.education.length > 0, // or experience
  ];

  return requiredFields.every(Boolean);
};