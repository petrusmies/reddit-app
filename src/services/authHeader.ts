// Get token from session storage
export const AuhtHeader = () => {
  const token = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')!) : '{}';

  if (token) {
    return { 'Authorization': `Bearer ${token.access_token}` };
  }

  return {};
}