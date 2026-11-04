import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const STATUS_CONFIG = {
  pending: {
    color: "#F59E0B",
    icon: "fa-regular fa-clock",
    label: "Pending",
  },
  processing: {
    color: "#8B5CF6",
    icon: "fa-solid fa-gears",
    label: "Processing",
  },
  confirmed: {
    color: "#06B6D4",
    icon: "fa-solid fa-circle-check",
    label: "Confirmed",
  },
  shipped: {
    color: "#3B82F6",
    icon: "fa-solid fa-truck-fast",
    label: "Shipped",
  },
  delivered: {
    color: "#10B981",
    icon: "fa-solid fa-box-open",
    label: "Delivered",
  },
  cancelled: {
    color: "#EF4444",
    icon: "fa-solid fa-circle-xmark",
    label: "Cancelled",
  },
  returned: {
    color: "#F97316",
    icon: "fa-solid fa-rotate-left",
    label: "Returned",
  },
};

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value ?? 0);
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload;

  return (
    <div className="rounded-xl border border-(--nc-border-color) bg-(--nc-surface) px-4 py-3 shadow-xl">
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <span className="text-sm font-semibold capitalize text-(--nc-text-primary)">
          {item.name}
        </span>
      </div>

      <p className="mt-1 text-lg font-bold text-(--nc-text-primary)">
        {formatNumber(item.value)} orders
      </p>

      <p className="text-xs text-(--nc-text-secondary)">
        {item.percentage}% of all orders
      </p>
    </div>
  );
}

function OrdersStatusChart({ ordersByStatus = [] }) {
  const chartData = ordersByStatus
    .map((item) => {
      const status = item._id?.toLowerCase();
      const config = STATUS_CONFIG[status];

      return {
        name: config?.label || status || "Unknown",
        value: Number(item.count) || 0,
        color: config?.color || "#94A3B8",
        icon: config?.icon || "fa-solid fa-circle",
        percentage: 0,
      };
    })
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);

  const totalOrders = chartData.reduce((total, item) => total + item.value, 0);

  const completedOrders =
    chartData.find((item) => item.name === "Delivered")?.value || 0;

  const completionRate = totalOrders
    ? Math.round((completedOrders / totalOrders) * 100)
    : 0;

  chartData.forEach((item) => {
    item.percentage = totalOrders
      ? ((item.value / totalOrders) * 100).toFixed(1)
      : 0;
  });

  return (
    <section className="overflow-hidden rounded-2xl border border-(--nc-border-color) bg-(--nc-surface) shadow-sm">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 border-b border-(--nc-border-color) p-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-500" />
            <h2 className="text-lg font-bold text-(--nc-text-primary)">
              Orders Analytics
            </h2>
          </div>

          <p className="mt-1 text-sm text-(--nc-text-secondary)">
            Track your order distribution and fulfillment.
          </p>
        </div>

        <span className="w-fit rounded-lg border border-(--nc-border-color) bg-(--nc-hover-bg) px-3 py-1.5 text-xs font-semibold text-(--nc-text-secondary)">
          <i className="fa-solid fa-chart-pie mr-2" />
          All time
        </span>
      </div>

      {totalOrders === 0 ? (
        <div className="flex min-h-80 items-center justify-center text-sm text-(--nc-text-secondary)">
          No order status data available.
        </div>
      ) : (
        <div className="p-5">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1.05fr_1fr]">
            {/* Donut chart */}
            <div className="relative mx-auto h-64 w-full max-w-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={78}
                    outerRadius={112}
                    paddingAngle={3}
                    cornerRadius={7}
                    stroke="none"
                    animationDuration={1000}
                  >
                    {chartData.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>

                  <Tooltip content={<CustomTooltip />} cursor={false} />
                </PieChart>
              </ResponsiveContainer>

              {/* Center content */}
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-medium uppercase tracking-widest text-(--nc-text-secondary)">
                  Total Orders
                </span>

                <span className="mt-1 text-4xl font-extrabold tracking-tight text-(--nc-text-primary)">
                  {formatNumber(totalOrders)}
                </span>

                <span className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                  <i className="fa-solid fa-circle-check" />
                  {completionRate}% delivered
                </span>
              </div>
            </div>

            {/* Status breakdown */}
            <div className="space-y-4">
              <div className="mb-5">
                <p className="text-sm font-semibold text-(--nc-text-primary)">
                  Status Breakdown
                </p>
                <p className="mt-1 text-xs text-(--nc-text-secondary)">
                  Overview of every order status.
                </p>
              </div>

              {chartData.map((item) => (
                <div key={item.name}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          color: item.color,
                          backgroundColor: `${item.color}18`,
                        }}
                      >
                        <i className={item.icon} />
                      </span>

                      <span className="truncate text-sm font-medium text-(--nc-text-primary)">
                        {item.name}
                      </span>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="text-sm font-bold text-(--nc-text-primary)">
                        {formatNumber(item.value)}
                      </span>

                      <span className="ml-2 text-xs text-(--nc-text-secondary)">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-(--nc-hover-bg)">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom summary */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-(--nc-border-color) pt-5">
            <div className="rounded-xl bg-(--nc-hover-bg) p-4">
              <div className="flex items-center gap-2 text-xs text-(--nc-text-secondary)">
                <i className="fa-solid fa-box-open text-emerald-500" />
                Delivered Orders
              </div>

              <p className="mt-2 text-xl font-bold text-(--nc-text-primary)">
                {formatNumber(completedOrders)}
              </p>
            </div>

            <div className="rounded-xl bg-(--nc-hover-bg) p-4">
              <div className="flex items-center gap-2 text-xs text-(--nc-text-secondary)">
                <i className="fa-solid fa-hourglass-half text-amber-500" />
                Pending Orders
              </div>

              <p className="mt-2 text-xl font-bold text-(--nc-text-primary)">
                {formatNumber(
                  chartData.find((item) => item.name === "Pending")?.value || 0,
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default OrdersStatusChart;
