import { Navigate, useRoutes } from 'react-router-dom';
import './App.css';
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
  // time now in Unix Epoch Seconds
  const now = Math.floor(Date.now() / 1000);
  if (!token || token.expires_in > now) {
    return <Navigate to="/login" />;
  }
  return props.element;
};

export default App;
