import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    <div className="font-roboto grid h-screen grid-cols-[200px_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <main className="bg-neutral-5">
        <div className="mx-auto max-w-[70rem]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
