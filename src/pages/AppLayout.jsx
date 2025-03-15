import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    <div className='font-roboto grid grid-cols-[150px_1fr] grid-rows-[auto_1fr] min-h-svh'>
      <Header />
      <Sidebar />
      <main className='py-3 px-2'>
      <Outlet />
      </main>
      </div>
    
  );
}

export default AppLayout;
