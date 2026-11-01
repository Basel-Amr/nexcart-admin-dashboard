// Displays navigation groups
import SidebarNavItem from "./SidebarNavItem";

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

function SidebarNavigation({ onClose }) {
  return (
    <nav
      aria-label="Main navigation"
      className="flex-1 space-y-5 overflow-y-auto px-3 py-4"
    >
      {navigationGroups.map((group) => (
        <div key={group.label}>
          <h2 className="mb-2 px-3 text-[9px] font-bold tracking-[0.16em] text-slate-500">
            {group.label}
          </h2>

          <div className="space-y-1">
            {group.items.map((item) => (
              <SidebarNavItem key={item.label} item={item} onClose={onClose} />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

export default SidebarNavigation;
