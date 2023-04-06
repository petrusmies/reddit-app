// Get user from session storage
export const AuhtHeader = () => {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  
  if (user && user.access_token) {
    return { Authorization: "Bearer " + user.access_token };
  } else {
    return {};
  }
}