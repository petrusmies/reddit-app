import { Navigate, useNavigate, useRoutes, useSearchParams } from 'react-router-dom';
import Login from './routes/Login';
import Posts from './routes/Posts';
import authService from './services/authService';

const auth: { code: string } | { error: string } | null = authService.auth();

function App() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // If auth has property code, get access token by authService.oauth and set in localStorage by authService.setToken()
  if (auth && 'code' in auth) {
    authService.oauth(auth.code)
      .then((res: any) => {
        authService.setToken(res)
      })
      .then(() => {
        setSearchParams({}); // clear search params
        navigate('/') // redirect to home page
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

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
