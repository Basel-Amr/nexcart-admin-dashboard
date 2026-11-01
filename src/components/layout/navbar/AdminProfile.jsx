import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

function AdminProfile({ adminName = "AdminText" }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleLogout = () => {
    sessionStorage.removeItem("adminName");
    sessionStorage.removeItem("isAuthenticated");

    setIsOpen(false);
    navigate("/login");
  };

  return (
    <div className="relative">
      {/* Profile button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Admin profile"
        aria-expanded={isOpen}
        className="flex items-center gap-3 rounded-xl p-1.5 transition-colors hover:bg-(--nc-hover-bg)"
      >
        {/* Avatar */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-(--nc-primary)/20 bg-(--nc-primary)/10 text-(--nc-primary)">
          <i className="fa-solid fa-user-tie text-lg" />
        </div>

        {/* Admin information */}
        <div className="hidden min-w-0 text-left sm:block">
          <p className="max-w-28 truncate text-sm font-bold text-(--nc-text-primary)">
            {adminName}
          </p>

          <p className="text-xs text-(--nc-text-secondary)">Administrator</p>
        </div>

        <i className="fa-solid fa-chevron-down hidden text-xs text-(--nc-text-secondary) sm:block" />
      </button>

      {/* Profile dropdown */}
      {isOpen && (
        <div
          className={`absolute right-0 top-14 z-50 w-52 overflow-hidden rounded-xl border shadow-xl ${
            isDark
              ? "border-slate-700 bg-(--nc-surface)"
              : "border-(--nc-border-color) bg-(--nc-surface)"
          }`}
        >
          <div className="border-b border-(--nc-border-color) px-4 py-3">
            <p className="truncate text-sm font-semibold text-(--nc-text-primary)">
              {adminName}
            </p>

            <p className="mt-1 text-xs text-(--nc-text-secondary)">
              Administrator
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-(--nc-text-secondary) transition-colors hover:bg-(--nc-hover-bg) hover:text-rose-500"
          >
            <i className="fa-solid fa-right-from-bracket" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
