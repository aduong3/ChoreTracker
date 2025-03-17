import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    <div className='font-roboto grid grid-cols-[200px_1fr] grid-rows-[auto_1fr] min-h-svh'>
      <Header />
      <Sidebar />
      <main className='py-3 px-2 bg-zinc-200 overflow-auto'>
        <div className='max-w-[75rem] mx-auto'>
          <Outlet />
        </div>
      </main>
      </div>
    
  );
}

export default AppLayout;
