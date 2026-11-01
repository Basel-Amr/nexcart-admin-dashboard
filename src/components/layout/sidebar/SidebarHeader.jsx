import { NavLink } from "react-router-dom";
import nexCartLogo from "../../../assets/NexCart-logo.png";

function SidebarHeader({ onClose }) {
  return (
    <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-800 px-5">
      <NavLink
        to="/"
        onClick={onClose}
        className="flex items-center gap-2.5"
        aria-label="NexCart Dashboard"
      >
        <img
          src={nexCartLogo}
          alt="NexCart logo"
          className="h-10 w-10 object-contain"
        />

        <span className="text-xl font-extrabold tracking-tight text-white">
          Nex<span className="text-(--nc-primary)">Cart</span>
        </span>
      </NavLink>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close navigation menu"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
      >
        <i className="fa-solid fa-xmark" aria-hidden="true" />
      </button>
    </div>
  );
}

export default SidebarHeader;
