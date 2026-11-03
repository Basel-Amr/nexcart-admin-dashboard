import UserActions from "../common/UserActions";
import { useTheme } from "../../context/ThemeContext";

function UserInfo({ user, onEdit, onUsersChange, variant = "table" }) {
  const { isDark } = useTheme();

  const initials = (user.username || "U")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const isAdmin = user.role === "admin";

  const nameColor = isDark ? "text-white" : "text-[var(--nc-text)]";

  const mutedColor = isDark
    ? "text-[var(--nc-dark-muted)]"
    : "text-[var(--nc-text-muted)]";

  const secondaryColor = isDark ? "text-slate-300" : "text-slate-600";

  const roleBadge = isAdmin
    ? "bg-violet-500/10 text-violet-500"
    : "bg-blue-500/10 text-blue-500";

  const verificationBadge = user.verified
    ? "text-emerald-500"
    : "text-amber-500";

  // Shared user identity
  const UserIdentity = () => (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--nc-primary)]/10 text-sm font-bold text-[var(--nc-primary)]">
        {initials}
      </div>

      <div className="min-w-0">
        <p className={`truncate text-sm font-bold ${nameColor}`}>
          {user.username}
        </p>

        <p className={`mt-1 text-xs ${mutedColor}`}>ID: #{user.id}</p>
      </div>
    </div>
  );

  // Shared role badge
  const RoleBadge = () => (
    <span
      className={`
        inline-flex w-fit items-center gap-1.5
        rounded-full px-3 py-1.5 text-xs font-bold
        ${roleBadge}
      `}
    >
      <i className={`fa-solid ${isAdmin ? "fa-shield-halved" : "fa-user"}`} />
      {isAdmin ? "Admin" : "Customer"}
    </span>
  );

  // Shared verification status
  const VerificationStatus = () => (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${verificationBadge}`}
    >
      <i
        className={`fa-solid ${user.verified ? "fa-circle-check" : "fa-clock"}`}
      />

      {user.verified ? "Verified" : "Pending"}
    </span>
  );

  // Shared actions
  const Actions = () => (
    <UserActions user={user} onEdit={onEdit} onUsersChange={onUsersChange} />
  );

  // Desktop table row
  if (variant === "table") {
    return (
      <tr
        className={`
          border-b transition-colors duration-200
          ${
            isDark
              ? "border-[var(--nc-dark-border)] hover:bg-white/[0.025]"
              : "border-[var(--nc-border)] hover:bg-slate-50"
          }
        `}
      >
        {/* User */}
        <td className="px-5 py-4">
          <UserIdentity />
        </td>

        {/* Email */}
        <td className="px-5 py-4">
          <p className={`min-w-48 text-sm ${secondaryColor}`}>{user.email}</p>
        </td>

        {/* Phone */}
        <td className="px-5 py-4">
          <p className={`min-w-32 text-sm ${secondaryColor}`}>
            {user.phone || "Not provided"}
          </p>
        </td>

        {/* Role */}
        <td className="px-5 py-4">
          <RoleBadge />
        </td>

        {/* Verification */}
        <td className="px-5 py-4">
          <VerificationStatus />
        </td>

        {/* Actions */}
        <td className="px-5 py-4">
          <Actions />
        </td>
      </tr>
    );
  }

  // Responsive mobile/tablet card
  return (
    <div
      className={`
        min-w-0 overflow-hidden rounded-xl border p-4
        transition-all duration-200
        hover:-translate-y-0.5
        ${
          isDark
            ? "border-[var(--nc-dark-border)] bg-[var(--nc-dark-page)]/50 hover:border-[var(--nc-primary)]/40"
            : "border-[var(--nc-border)] bg-slate-50 hover:border-[var(--nc-primary)]/50"
        }
      `}
    >
      {/* User identity and role */}
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
        <UserIdentity />
        <RoleBadge />
      </div>

      {/* User information */}
      <div
        className={`
          mt-4 grid grid-cols-1 gap-3 border-t pt-4
          sm:grid-cols-2
          ${
            isDark
              ? "border-[var(--nc-dark-border)]"
              : "border-[var(--nc-border)]"
          }
        `}
      >
        {/* Email */}
        <div className="min-w-0">
          <p
            className={`mb-1 text-[10px] font-bold uppercase tracking-wider ${mutedColor}`}
          >
            Email Address
          </p>

          <p className={`break-all text-sm ${secondaryColor}`}>{user.email}</p>
        </div>

        {/* Phone */}
        <div className="min-w-0">
          <p
            className={`mb-1 text-[10px] font-bold uppercase tracking-wider ${mutedColor}`}
          >
            Phone
          </p>

          <p className={`break-words text-sm ${secondaryColor}`}>
            {user.phone || "Not provided"}
          </p>
        </div>
      </div>

      {/* Verification and actions */}
      <div
        className={`
          mt-4 flex flex-col gap-4 border-t pt-4
          sm:flex-row sm:items-center sm:justify-between
          ${
            isDark
              ? "border-[var(--nc-dark-border)]"
              : "border-[var(--nc-border)]"
          }
        `}
      >
        <VerificationStatus />

        <div className="flex justify-end">
          <Actions />
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
