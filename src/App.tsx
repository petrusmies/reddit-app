import { Navigate, useRoutes } from 'react-router-dom';
import Login from './routes/Login';
import Posts from './routes/Posts';

function App() {

  let element = useRoutes([
    { path: '/login', element: <Login /> },

    // Private routes
    { path: '/', element: <PrivateRoute element={<Posts />} /> },
  ]);
  
  return element;
}

// Wrapper component for routes. If no token in sessionStorage, redirect to login page.
const PrivateRoute = (props: any) => {
  const token = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')!) : null;
  
  const now = Math.floor(Date.now() / 1000);

  if (!token || token.expires_at < now) {
    sessionStorage.clear();
    return <Navigate to="/login" />;
  }

  return props.element;
};

export default App;
