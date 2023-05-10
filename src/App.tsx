import { Navigate, useRoutes } from 'react-router-dom';
import Login from './routes/Login';
import Posts from './routes/Posts';

function App() {

  let element = useRoutes([
    { path: '/login', element: <PublicRoute data-testid='public-route' element={<Login data-testid='login-page' />} /> },

    // Private routes
    { path: '/', element: <PrivateRoute data-testid='private-route' element={<Posts data-testid='posts-page' />} /> },
  ]);
  
  return element;
}

// Wrapper component for public routes.
// If token in sessionStorage, redirect to home page.
// Otherwise, render the route.
const PublicRoute = (props: any) => {
  const token = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')!) : null;

  if (token) {
    return <Navigate to="/" />;
  }

  return props.element;
};

// Wrapper component for private routes.
// If no token in sessionStorage, redirect to login page.
// If token is expired, redirect to login page.
// Otherwise, render the route.
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
