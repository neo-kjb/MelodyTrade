import { Outlet } from 'react-router-dom';
import MainNavigation from './MainNavigation';
export default function Root() {
  return (
    <>
      <MainNavigation />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
}
