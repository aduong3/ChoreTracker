import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function AppLayout() {
  return (
    <div className='font-roboto'>
      <Header />
      <Outlet />
      </div>
    
  );
}

export default AppLayout;
