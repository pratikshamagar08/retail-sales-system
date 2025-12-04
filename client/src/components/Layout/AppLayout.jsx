import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
