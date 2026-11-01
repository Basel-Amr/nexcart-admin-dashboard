// Displays an individual navigation link
import { NavLink } from "react-router-dom";

function SidebarNavItem({ item, onClose }) {
  return (
    <NavLink
      to={item.to}
      end={item.end ?? false}
      onClick={onClose}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-lg border px-3 py-2.5
        text-[13px] font-medium transition-all duration-200
        ${
          isActive
            ? "border-(--nc-primary)/20 bg-(--nc-primary)/10 text-(--nc-primary) shadow-sm"
            : "border-transparent text-slate-400 hover:bg-slate-800/70 hover:text-white"
        }`
      }
    >
      <i
        className={`${item.icon} w-5 shrink-0 text-center text-sm ${
          item.highlight ? "text-(--nc-primary)" : ""
        }`}
        aria-hidden="true"
      />

      <span className="flex-1">{item.label}</span>

      {item.highlight && (
        <span className="rounded-md bg-(--nc-primary)/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-(--nc-primary)">
          New
        </span>
      )}

      <i
        className={`fa-solid fa-chevron-right text-[9px] transition-all ${
          item.highlight
            ? "text-(--nc-primary)/60"
            : "text-transparent group-hover:translate-x-0.5 group-hover:text-slate-500"
        }`}
        aria-hidden="true"
      />
    </NavLink>
  );
}

export default SidebarNavItem;