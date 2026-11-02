import { Link } from "react-router-dom";
import nexCartLogo from "../../../assets/NexCart-logo.png";

function SidebarHeader({ closeSidebar }) {
  return (
    <div className="flex min-h-[88px] shrink-0 items-center justify-between px-5">
      {/* Brand */}
      <Link to="/" onClick={closeSidebar} className="flex items-center gap-3">
        <img
          src={nexCartLogo}
          alt="NexCart Logo"
          className="h-11 w-auto object-contain"
        />

        <span className="text-xl font-extrabold tracking-tight text-(--nc-text-primary)">
          Nex<span className="text-(--nc-primary)">Cart</span>
        </span>
      </Link>

      {/* Mobile close button */}
      <button
        type="button"
        onClick={closeSidebar}
        aria-label="Close navigation menu"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-(--nc-text-secondary) transition-colors hover:bg-(--nc-hover-bg) hover:text-(--nc-primary) lg:hidden"
      >
        <i className="fa-solid fa-xmark text-lg" />
      </button>
    </div>
  );
}

export default SidebarHeader;
