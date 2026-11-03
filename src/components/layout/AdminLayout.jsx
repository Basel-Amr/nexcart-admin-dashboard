import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function AdminLayout() {
  return (
    <div className="min-h-screen w-full bg-(--nc-page-bg) transition-colors duration-200">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Dashboard Area */}
      <div className="min-h-screen pt-[84px] lg:ml-72">
        <main className="min-h-[calc(100vh-84px)] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
