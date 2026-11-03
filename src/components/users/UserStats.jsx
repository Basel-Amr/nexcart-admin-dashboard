import { useTheme } from "../../context/ThemeContext";

function UserStats({ users }) {
  const { isDark } = useTheme();

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: "fa-users",
      color: "text-cyan-500",
      background: "bg-cyan-500/10",
      description: "All registered users",
    },
    {
      title: "Administrators",
      value: users.filter((user) => user.role === "admin").length,
      icon: "fa-shield-halved",
      color: "text-violet-500",
      background: "bg-violet-500/10",
      description: "Users with admin access",
    },
    {
      title: "Customers",
      value: users.filter((user) => user.role === "customer").length,
      icon: "fa-user",
      color: "text-blue-500",
      background: "bg-blue-500/10",
      description: "Registered customers",
    },
    {
      title: "Verified",
      value: users.filter((user) => user.verified).length,
      icon: "fa-circle-check",
      color: "text-emerald-500",
      background: "bg-emerald-500/10",
      description: "Verified accounts",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className={`group relative overflow-hidden rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
            isDark
              ? "border-[var(--nc-dark-border)] bg-[var(--nc-dark-card)]"
              : "border-[var(--nc-border)] bg-white"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p
                className={`text-sm font-medium ${
                  isDark
                    ? "text-[var(--nc-dark-muted)]"
                    : "text-[var(--nc-text-muted)]"
                }`}
              >
                {stat.title}
              </p>

              <h2
                className={`mt-3 text-3xl font-bold tracking-tight ${
                  isDark ? "text-white" : "text-[var(--nc-text)]"
                }`}
              >
                {stat.value.toLocaleString()}
              </h2>
            </div>

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.background} ${stat.color} transition-transform duration-300 group-hover:scale-110`}
            >
              <i className={`fa-solid ${stat.icon} text-lg`} />
            </div>
          </div>

          <p
            className={`mt-4 text-xs ${
              isDark
                ? "text-[var(--nc-dark-muted)]"
                : "text-[var(--nc-text-muted)]"
            }`}
          >
            {stat.description}
          </p>

          <div
            className={`pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-[0.04] blur-2xl ${stat.background}`}
          />
        </div>
      ))}
    </div>
  );
}

export default UserStats;
