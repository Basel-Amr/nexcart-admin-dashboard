import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";

function NavbarNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <div className="relative">
      {/* Notification button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Notifications"
        aria-expanded={isOpen}
        className={`relative flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-200 ${
          isDark
            ? "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-(--nc-primary) hover:text-(--nc-primary)"
            : "border-(--nc-border-color) bg-(--nc-surface) text-(--nc-text-secondary) hover:border-(--nc-primary) hover:text-(--nc-primary)"
        }`}
      >
        <i className="fa-regular fa-bell text-lg" />

        {/* Notification indicator */}
        <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full border-2 border-(--nc-navbar-bg) bg-rose-500" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`absolute right-0 top-14 z-50 w-72 overflow-hidden rounded-xl border shadow-xl sm:w-80 ${
            isDark
              ? "border-slate-700 bg-(--nc-surface)"
              : "border-(--nc-border-color) bg-(--nc-surface)"
          }`}
        >
          <div className="flex items-center justify-between border-b border-(--nc-border-color) px-4 py-3">
            <h3 className="font-semibold text-(--nc-text-primary)">
              Notifications
            </h3>

            <span className="rounded-full bg-(--nc-primary)/10 px-2 py-1 text-[10px] font-bold text-(--nc-primary)">
              NEW
            </span>
          </div>

          <div className="flex items-start gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--nc-primary)/10 text-(--nc-primary)">
              <i className="fa-solid fa-store" />
            </div>

            <div>
              <p className="text-sm font-semibold text-(--nc-text-primary)">
                Welcome to NexCart!
              </p>

              <p className="mt-1 text-xs leading-relaxed text-(--nc-text-secondary)">
                Your admin workspace is ready. Start managing your store.
              </p>

              <span className="mt-2 block text-[10px] text-(--nc-text-secondary)">
                Just now
              </span>
            </div>
          </div>

          <div className="border-t border-(--nc-border-color) px-4 py-3 text-center">
            <p className="text-xs text-(--nc-text-secondary)">
              You're all caught up!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavbarNotifications;
