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

// Wrapper component for routes. If no token in localStorage, redirect to login page.
const PrivateRoute = (props: any) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return props.element;
};

export default App;
