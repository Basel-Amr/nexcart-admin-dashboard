import SidebarNavItem from "./SidebarNavItem";

const navigationGroups = [
  {
    label: "Overview",
    items: [
      {
        name: "Dashboard",
        path: "/",
        icon: "fa-solid fa-house",
        end: true,
      },
    ],
  },
  {
    label: "Store Management",
    items: [
      {
        name: "Customers",
        path: "/customers",
        icon: "fa-solid fa-users",
      },
      {
        name: "Products",
        path: "/products",
        icon: "fa-solid fa-box-open",
      },
      {
        name: "Add Product",
        path: "/products/new",
        icon: "fa-solid fa-circle-plus",
        badge: "NEW",
      },
      {
        name: "Orders",
        path: "/orders",
        icon: "fa-solid fa-receipt",
      },
      {
        name: "Carts",
        path: "/carts",
        icon: "fa-solid fa-cart-shopping",
      },
    ],
  },
  {
    label: "Insights & Preferences",
    items: [
      {
        name: "Analytics",
        path: "/analytics",
        icon: "fa-solid fa-chart-line",
      },
      {
        name: "Settings",
        path: "/settings",
        icon: "fa-solid fa-gear",
      },
    ],
  },
];

function SidebarNavigation({ closeSidebar }) {
  return (
    <nav
      className="
        min-h-0 flex-1
        overflow-y-auto
        px-3 pb-5 pt-3
        [scrollbar-width:none]
        [-ms-overflow-style:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
      {navigationGroups.map((group) => (
        <div key={group.label} className="mb-7 last:mb-0">
          {/* Navigation group heading */}
          <h2 className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-(--nc-text-secondary)">
            {group.label}
          </h2>

          {/* Navigation items */}
          <div className="space-y-1.5">
            {group.items.map((item) => (
              <SidebarNavItem
                key={item.path}
                item={item}
                closeSidebar={closeSidebar}
              />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

export default SidebarNavigation;
