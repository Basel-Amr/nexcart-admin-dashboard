import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-slate-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="min-w-0 flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
