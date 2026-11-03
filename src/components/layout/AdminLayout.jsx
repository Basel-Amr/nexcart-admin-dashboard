import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function AdminLayout() {
  return (
    <div
      className="
        flex min-h-screen w-full
        overflow-x-hidden
        bg-[var(--nc-page-bg)]
        text-[var(--nc-text-primary)]
        transition-colors duration-200
      "
    >
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Dashboard Area */}
      <div
        className="
          flex min-h-screen min-w-0
          flex-1 flex-col
          bg-[var(--nc-page-bg)]
          transition-colors duration-200
        "
      >
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main
          className="
            min-w-0 flex-1
            bg-[var(--nc-page-bg)]
            p-4
            text-[var(--nc-text-primary)]
            transition-colors duration-200
            sm:p-6
            lg:p-8
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
