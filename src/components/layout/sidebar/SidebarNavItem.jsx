import { NavLink } from "react-router-dom";

function SidebarNavItem({ item, closeSidebar }) {
  return (
    <NavLink
      to={item.path}
      end={item.end}
      onClick={closeSidebar}
      className={({ isActive }) => `
        group relative flex min-h-11 items-center gap-3
        rounded-xl border px-3.5 py-2.5
        text-[13px] font-medium
        transition-all duration-200

        ${
          isActive
            ? "border-(--nc-primary)/25 bg-(--nc-primary)/10 text-(--nc-primary)"
            : "border-transparent text-(--nc-text-secondary) hover:bg-(--nc-hover-bg) hover:text-(--nc-text-primary)"
        }
      `}
    >
      {/* Active indicator */}
      <span
        className={`
          absolute left-0 top-1/2 h-5 w-[3px]
          -translate-y-1/2 rounded-r-full
          bg-(--nc-primary)
          transition-opacity duration-200
          ${"group-[.active]:opacity-100 opacity-0"}
        `}
      />

      {/* Icon */}
      <i
        className={`${item.icon} w-5 text-center text-[15px] transition-transform duration-200 group-hover:scale-110`}
      />

      {/* Label */}
      <span className="flex-1">{item.name}</span>

      {/* Badge */}
      {item.badge && (
        <span className="rounded-md bg-(--nc-primary)/10 px-2 py-1 text-[9px] font-bold tracking-wide text-(--nc-primary)">
          {item.badge}
        </span>
      )}

      {/* Add Product arrow */}
      {item.badge && (
        <i className="fa-solid fa-chevron-right text-[10px] text-(--nc-primary)" />
      )}
    </NavLink>
  );
}

export default SidebarNavItem;
