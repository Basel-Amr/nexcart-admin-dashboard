import UserInfo from "./UserInfo";
import { useTheme } from "../../context/ThemeContext";

function UserTable({ users, onEdit, onUsersChange }) {
  const { isDark } = useTheme();

  const headers = [
    "User",
    "Email Address",
    "Phone",
    "Role",
    "Verification",
    "Actions",
  ];

  return (
    <div
      className={`
        w-full min-w-0 overflow-hidden rounded-2xl border shadow-sm
        transition-colors duration-200
        ${
          isDark
            ? "border-[var(--nc-dark-border)] bg-[var(--nc-dark-card)]"
            : "border-[var(--nc-border)] bg-white"
        }
      `}
    >
      {/* Table heading */}
      <div
        className={`
          flex flex-col gap-3 border-b px-4 py-4
          sm:flex-row sm:items-center sm:justify-between sm:px-5
          ${
            isDark
              ? "border-[var(--nc-dark-border)]"
              : "border-[var(--nc-border)]"
          }
        `}
      >
        <div>
          <h3
            className={`font-bold ${
              isDark ? "text-white" : "text-[var(--nc-text)]"
            }`}
          >
            All Users
          </h3>

          <p
            className={`mt-1 text-xs ${
              isDark
                ? "text-[var(--nc-dark-muted)]"
                : "text-[var(--nc-text-muted)]"
            }`}
          >
            User accounts registered in your store.
          </p>
        </div>

        <span
          className={`
            w-fit rounded-lg px-3 py-1.5 text-xs font-bold
            ${
              isDark
                ? "bg-[var(--nc-dark-page)] text-[var(--nc-dark-muted)]"
                : "bg-slate-100 text-slate-600"
            }
          `}
        >
          {users.length} {users.length === 1 ? "user" : "users"}
        </span>
      </div>

      {/* Desktop and large tablet table */}
      <div className="hidden w-full overflow-x-auto lg:block">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead
            className={isDark ? "bg-[var(--nc-dark-page)]" : "bg-slate-50"}
          >
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className={`
                    whitespace-nowrap px-5 py-4
                    text-[11px] font-bold uppercase tracking-wider
                    ${
                      isDark
                        ? "text-[var(--nc-dark-muted)]"
                        : "text-[var(--nc-text-muted)]"
                    }
                  `}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <UserInfo
                  key={user.id}
                  user={user}
                  onEdit={onEdit}
                  onUsersChange={onUsersChange}
                  variant="table"
                />
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <EmptyUsers isDark={isDark} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile and tablet user cards */}
      <div className="grid grid-cols-1 gap-3 p-3 lg:hidden sm:p-4">
        {users.length > 0 ? (
          users.map((user) => (
            <UserInfo
              key={user.id}
              user={user}
              onEdit={onEdit}
              onUsersChange={onUsersChange}
              variant="card"
            />
          ))
        ) : (
          <EmptyUsers isDark={isDark} />
        )}
      </div>
    </div>
  );
}

function EmptyUsers({ isDark }) {
  return (
    <div className="px-4 py-12 text-center sm:py-16">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--nc-primary)]/10 text-[var(--nc-primary)]">
        <i className="fa-solid fa-user-slash text-xl" />
      </div>

      <h4
        className={`mt-4 font-bold ${
          isDark ? "text-white" : "text-[var(--nc-text)]"
        }`}
      >
        No users found
      </h4>

      <p
        className={`mt-1 text-sm ${
          isDark ? "text-[var(--nc-dark-muted)]" : "text-[var(--nc-text-muted)]"
        }`}
      >
        Try another search or add a new user.
      </p>
    </div>
  );
}

export default UserTable;
