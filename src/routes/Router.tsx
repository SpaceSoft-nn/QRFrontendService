import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import {
  Dashboard,
  RegisterVerify,
  ForgotPassword,
  Login,
  Register,
  Error,
  Home
} from '../Pages';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    // private route
    path: "dashboard",
    element: <PrivateRoute element={<Dashboard/>}/>,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "forgot_password",
    element: <ForgotPassword />,
  },
  {
    path: "register_verify",
    element: <RegisterVerify />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;