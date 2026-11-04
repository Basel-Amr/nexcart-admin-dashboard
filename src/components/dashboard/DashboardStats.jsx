import StatCard from "./statCard";

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value ?? 0);
}

function DashboardStats({ data }) {
  const stats = [
    {
      title: "Total Revenue",
      value: formatNumber(data.revenue?.total),
      icon: "fa-solid fa-sack-dollar",
      description: "Total store revenue",
      iconColor: "bg-cyan-500/10 text-cyan-500",
    },
    {
      title: "Total Orders",
      value: formatNumber(data.orders?.total),
      icon: "fa-solid fa-bag-shopping",
      description: "All recorded orders",
      iconColor: "bg-violet-500/10 text-violet-500",
    },
    {
      title: "Total Customers",
      value: formatNumber(data.totalCustomers),
      icon: "fa-solid fa-users",
      description: "Registered customers",
      iconColor: "bg-emerald-500/10 text-emerald-500",
    },
    {
      title: "Pending Orders",
      value: formatNumber(data.orders?.pending),
      icon: "fa-solid fa-clock",
      description: "Orders awaiting action",
      iconColor: "bg-amber-500/10 text-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

export default DashboardStats;
