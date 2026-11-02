import { useState } from "react";

import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarNavigation from "./sidebar/SidebarNavigation";
import SidebarFooter from "./sidebar/SidebarFooter";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-(--nc-border-color) bg-(--nc-navbar-bg) text-(--nc-text-primary) shadow-lg transition-colors hover:text-(--nc-primary) lg:hidden"
      >
        <i className="fa-solid fa-bars text-lg" />
      </button>

      {/* Mobile backdrop */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex h-dvh w-72 shrink-0 flex-col
          overflow-hidden
          border-r border-(--nc-border-color)
          bg-(--nc-navbar-bg)
          text-(--nc-text-primary)
          shadow-2xl shadow-black/20
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:sticky lg:top-0 lg:z-30
          lg:h-screen lg:translate-x-0 lg:shadow-none
        `}
      >
        {/* Sidebar logo/header */}
        <SidebarHeader closeSidebar={closeSidebar} />

        {/* Navigation */}
        <SidebarNavigation closeSidebar={closeSidebar} />

        {/* Footer */}
        <SidebarFooter />
      </aside>
    </>
  );
}

export default Sidebar;
