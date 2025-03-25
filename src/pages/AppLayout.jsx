import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    <div className="font-roboto grid min-h-svh grid-cols-[200px_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <main className="overflow-auto bg-neutral-50 px-2 py-3">
        <div className="mx-auto max-w-[75rem]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
