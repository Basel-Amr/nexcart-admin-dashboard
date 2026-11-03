import { useTheme } from "../../context/ThemeContext";

function UserManagement({
  searchTerm,
  onSearchChange,
  onAddClick,
  isFormOpen,
  isEditing,
}) {
  const { isDark } = useTheme();

  return (
    <section
      className={`
        flex flex-col gap-5 rounded-2xl border p-5
        transition-colors duration-200
        sm:p-6 xl:flex-row xl:items-center xl:justify-between
        ${
          isDark
            ? "border-[var(--nc-dark-border)] bg-[var(--nc-dark-card)]"
            : "border-[var(--nc-border)] bg-white"
        }
      `}
    >
      {/* LEFT: PAGE INFORMATION */}
      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--nc-primary)]" />

          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--nc-primary)]">
            Store Management
          </span>
        </div>

        <h1
          className={`text-2xl font-bold tracking-tight sm:text-3xl ${
            isDark ? "text-white" : "text-[var(--nc-text)]"
          }`}
        >
          Users Management
        </h1>

        <p
          className={`mt-1 text-sm ${
            isDark
              ? "text-[var(--nc-dark-muted)]"
              : "text-[var(--nc-text-muted)]"
          }`}
        >
          Manage your administrators and customers in one place.
        </p>
      </div>

      {/* RIGHT: SEARCH AND ADD USER */}
      <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
        {/* Search */}
        <div
          className={`
            flex min-h-11 min-w-0 flex-1 items-center gap-3
            rounded-xl border px-4 transition
            focus-within:border-[var(--nc-primary)]
            focus-within:ring-2 focus-within:ring-cyan-400/10
            xl:w-72
            ${
              isDark
                ? "border-[var(--nc-dark-border)] bg-[var(--nc-dark-page)]"
                : "border-[var(--nc-border)] bg-slate-50"
            }
          `}
        >
          <i className="fa-solid fa-magnifying-glass text-sm text-[var(--nc-text-secondary)]" />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search users..."
            aria-label="Search users"
            className={`min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 ${
              isDark ? "text-white" : "text-[var(--nc-text)]"
            }`}
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="text-slate-400 transition hover:text-[var(--nc-primary)]"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          )}
        </div>

        {/* Add User */}
        <button
          type="button"
          onClick={onAddClick}
          className="
            inline-flex min-h-11 shrink-0 items-center
            justify-center gap-2 rounded-xl
            bg-[var(--nc-primary)] px-5
            text-sm font-bold text-slate-950
            shadow-sm shadow-cyan-500/10
            transition-all duration-200
            hover:-translate-y-0.5
            hover:bg-[var(--nc-primary-hover)]
            hover:shadow-lg hover:shadow-cyan-500/20
            active:translate-y-0
          "
        >
          <i className={`fa-solid ${isFormOpen ? "fa-minus" : "fa-plus"}`} />

          {isFormOpen ? "Close Form" : isEditing ? "Add New User" : "Add User"}
        </button>
      </div>
    </section>
  );
}

export default UserManagement;
