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
        aria-expanded={isOpen}
        className="
          fixed left-4 top-4 z-[60]
          flex h-10 w-10 items-center justify-center
          rounded-xl
          border border-[var(--nc-border-color)]
          bg-[var(--nc-navbar-bg)]
          text-[var(--nc-text-primary)]
          shadow-lg
          transition-all duration-200
          hover:text-[var(--nc-primary)]
          hover:border-[var(--nc-primary)]
          lg:hidden
        "
      >
        <i className="fa-solid fa-bars text-lg" />
      </button>

      {/* Mobile backdrop */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeSidebar}
          className="
            fixed inset-0 z-40
            bg-black/60 backdrop-blur-[2px]
            lg:hidden
          "
        />
      )}

      {/* Fixed sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex h-dvh w-72 flex-col
          overflow-hidden

          bg-[var(--nc-navbar-bg)]
          text-[var(--nc-text-primary)]

          border-r-0
          shadow-none

          transition-transform duration-300 ease-in-out

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
        `}
      >
        {/* Sidebar header */}
        <SidebarHeader closeSidebar={closeSidebar} />

        {/* Sidebar navigation */}
        <SidebarNavigation closeSidebar={closeSidebar} />

        {/* Sidebar footer */}
        <SidebarFooter />
      </aside>

      {/* Desktop spacer: reserves exactly 18rem for the fixed sidebar */}
      <div aria-hidden="true" className="hidden w-72 shrink-0 lg:block" />
    </>
  );
}

export default Sidebar;
  