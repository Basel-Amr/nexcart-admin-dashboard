import { useState } from "react";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarNavigation from "./sidebar/SidebarNavigation";
import SidebarFooter from "./sidebar/SidebarFooter";

const navigationGroups = [
  {
    label: "OVERVIEW",
    items: [
      {
        label: "Dashboard",
        icon: "fa-solid fa-house",
        to: "/",
        end: true,
      },
    ],
  },
  {
    label: "STORE MANAGEMENT",
    items: [
      {
        label: "Customers",
        icon: "fa-solid fa-users",
        to: "/customers",
      },
      {
        label: "Products",
        icon: "fa-solid fa-box-open",
        to: "/products",
      },
      {
        label: "Add Product",
        icon: "fa-solid fa-circle-plus",
        to: "/products/new",
        highlight: true,
      },
      {
        label: "Orders",
        icon: "fa-solid fa-receipt",
        to: "/orders",
      },
      {
        label: "Carts",
        icon: "fa-solid fa-cart-shopping",
        to: "/carts",
      },
    ],
  },
  {
    label: "INSIGHTS & PREFERENCES",
    items: [
      {
        label: "Analytics",
        icon: "fa-solid fa-chart-line",
        to: "/analytics",
      },
      {
        label: "Settings",
        icon: "fa-solid fa-gear",
        to: "/settings",
      },
    ],
  },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        className="fixed left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-white shadow-lg transition hover:border-(--nc-primary) hover:text-(--nc-primary) lg:hidden"
      >
        <i className="fa-solid fa-bars text-lg" aria-hidden="true" />
      </button>

      {/* Mobile Backdrop */}
      {isOpen && (
        <button
          type="button"
          onClick={closeSidebar}
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex h-dvh w-72 shrink-0 flex-col
          overflow-hidden border-r border-slate-800/80
          bg-slate-950 text-white shadow-2xl shadow-black/30
          transition-transform duration-300 ease-in-out

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          lg:sticky lg:top-0 lg:h-screen
          lg:translate-x-0 lg:shadow-none
        `}
      >
        <SidebarHeader onClose={closeSidebar} />

        <SidebarNavigation onClose={closeSidebar} />

        <SidebarFooter />
      </aside>
    </>
  );
}

export default Sidebar;
