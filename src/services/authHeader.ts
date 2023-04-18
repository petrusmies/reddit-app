// Get token from session storage
export const AuhtHeader = () => {
  const token = sessionStorage.getItem("token") || "{}";

  if (token) {
    return { 'Authorization': `Bearer ${token}` };
  }

  return {};
}