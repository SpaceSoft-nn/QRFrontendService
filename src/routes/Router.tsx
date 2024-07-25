import { createBrowserRouter } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute';
import {
  Dashboard,
  RegisterVerify,
  ForgotPassword,
  Login,
  Register,
  Error,
  Home
} from '../Pages';
import { Help, Main, Orders, PaymentHistory, Settings, Terminal } from '../components';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    // private route
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "terminal",
        element: <Terminal />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "payment_history",
        element: <PaymentHistory />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "help",
        element: <Help />
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot_password",
    element: <ForgotPassword />,
  },
  {
    path: "/register_verify",
    element: <RegisterVerify />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;