import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './layouts/Root';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/users/LoginPage';
import SignupPage from './pages/users/SignupPage';
import UserDetailsPage from './pages/users/UserDetailsPage';
import DiskDetailsPage from './pages/disks/DiskDetailsPage';
import EditDiskPage from './pages/disks/EditDiskPage';
import AddDiskPage from './pages/disks/AddDiskPage';
import SwapRequestPage from './pages/swaps/SwapRequestPage';
import DisksIndexPage from './pages/disks/DisksIndexPage';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { path: '/', element: <WelcomePage /> },
        { path: '/users/login', element: <LoginPage /> },
        { path: '/users/signup', element: <SignupPage /> },
        { path: '/users/:userId', element: <UserDetailsPage /> },
        { path: '/disks', element: <DisksIndexPage /> },
        { path: '/disks/:diskId', element: <DiskDetailsPage /> },
        { path: '/disks/:diskId/edit', element: <EditDiskPage /> },
        { path: '/disks/new', element: <AddDiskPage /> },
        { path: '/swaps', element: <SwapRequestPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
