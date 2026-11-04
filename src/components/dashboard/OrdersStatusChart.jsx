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

// Format numbers
function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value ?? 0);
}

// Custom chart tooltip
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload;

  return (
    <div
      className="w-[190px] rounded-xl border px-4 py-3 shadow-2xl backdrop-blur-xl"
      style={{
        backgroundColor: "var(--nc-surface)",
        borderColor: "var(--nc-border-color)",
      }}
    >
      {/* Status title */}
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: item.color }}
        />

        <span className="text-sm font-bold text-(--nc-text-primary)">
          {item.name}
        </span>
      </div>

      {/* Order count */}
      <p className="mt-2 text-xl font-extrabold text-(--nc-text-primary)">
        {formatNumber(item.value)}
        <span className="ml-1 text-xs font-medium text-(--nc-text-secondary)">
          orders
        </span>
      </p>

      {/* Percentage */}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-(--nc-text-secondary)">
          Share of orders
        </span>

        <span className="text-xs font-bold" style={{ color: item.color }}>
          {item.percentage}%
        </span>
      </div>

      {/* Percentage progress */}
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-(--nc-hover-bg)">
        <div
          className="h-full rounded-full"
          style={{
            width: `${item.percentage}%`,
            backgroundColor: item.color,
          }}
        />
      </div>
    </div>
  );
}

function OrdersStatusChart({ ordersByStatus = [] }) {
  // Prepare chart data
  const chartData = ordersByStatus
    .map((item) => {
      const status = item._id?.toLowerCase();
      const config = STATUS_CONFIG[status];

      return {
        name: config?.label || status || "Unknown",
        value: Number(item.count) || 0,
        color: config?.color || "#94A3B8",
        icon: config?.icon || "fa-solid fa-circle",
      };
    })
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);

  // Total orders
  const totalOrders = chartData.reduce((total, item) => total + item.value, 0);

  // Add percentage to every status
  const formattedChartData = chartData.map((item) => ({
    ...item,
    percentage: totalOrders
      ? ((item.value / totalOrders) * 100).toFixed(1)
      : "0.0",
  }));

  // Delivered orders
  const completedOrders =
    chartData.find((item) => item.name === "Delivered")?.value || 0;

  // Pending orders
  const pendingOrders =
    chartData.find((item) => item.name === "Pending")?.value || 0;

  // Delivery rate
  const completionRate = totalOrders
    ? Math.round((completedOrders / totalOrders) * 100)
    : 0;

  return (
    <section className="overflow-hidden rounded-2xl border border-(--nc-border-color) bg-(--nc-surface) shadow-sm transition-colors duration-200">
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

      {/* Chart Content */}
      {totalOrders === 0 ? (
        <div className="flex min-h-80 items-center justify-center text-sm text-(--nc-text-secondary)">
          No order status data available.
        </div>
      ) : (
        <div className="p-5">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1.05fr_1fr]">
            {/* Donut Chart */}
            <div className="relative mx-auto h-80 w-full max-w-[340px]">
              {/* Chart layer */}
              <div className="relative z-20 h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={formattedChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="58%"
                      innerRadius={76}
                      outerRadius={108}
                      paddingAngle={3}
                      cornerRadius={7}
                      stroke="none"
                      animationDuration={1200}
                      animationEasing="ease-out"
                    >
                      {formattedChartData.map((item) => (
                        <Cell
                          key={item.name}
                          fill={item.color}
                          style={{
                            cursor: "pointer",
                            outline: "none",
                            transition: "opacity 200ms ease",
                          }}
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={false}
                      position={{ x: 65, y: 5 }}
                      wrapperStyle={{
                        zIndex: 1000,
                        pointerEvents: "none",
                        outline: "none",
                      }}
                      isAnimationActive={false}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Center Content */}
              <div className="pointer-events-none absolute left-1/2 top-[58%] z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
                <span className="text-xs font-medium uppercase tracking-widest text-(--nc-text-secondary)">
                  Total Orders
                </span>

                <span className="mt-1 text-4xl font-extrabold tracking-tight text-(--nc-text-primary)">
                  {formatNumber(totalOrders)}
                </span>

                <span className="mt-2 flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-emerald-500">
                  <i className="fa-solid fa-circle-check" />
                  {completionRate}% delivered
                </span>
              </div>
            </div>

            {/* Status Breakdown */}
            <div className="space-y-4">
              <div className="mb-5">
                <p className="text-base font-bold text-(--nc-text-primary)">
                  Status Breakdown
                </p>

                <p className="mt-1 text-sm text-(--nc-text-secondary)">
                  Overview of every order status.
                </p>
              </div>

              {formattedChartData.map((item) => (
                <div key={item.name} className="group">
                  {/* Status Information */}
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110"
                        style={{
                          color: item.color,
                          backgroundColor: `${item.color}18`,
                        }}
                      >
                        <i className={`${item.icon} text-base`} />
                      </span>

                      <span className="truncate text-sm font-semibold text-(--nc-text-primary)">
                        {item.name}
                      </span>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="text-sm font-extrabold text-(--nc-text-primary)">
                        {formatNumber(item.value)}
                      </span>

                      <span className="ml-2 text-xs text-(--nc-text-secondary)">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-1.5 overflow-hidden rounded-full bg-(--nc-hover-bg)">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out group-hover:brightness-125"
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

          {/* Bottom Summary */}
          <div className="mt-7 grid grid-cols-2 gap-3 border-t border-(--nc-border-color) pt-5">
            {/* Delivered Orders */}
            <div className="group rounded-xl border border-(--nc-border-color) bg-(--nc-hover-bg) p-4 transition-all duration-200 hover:border-emerald-500/40">
              <div className="flex items-center gap-2 text-xs font-medium text-(--nc-text-secondary)">
                <i className="fa-solid fa-box-open text-emerald-500" />
                Delivered Orders
              </div>

              <p className="mt-2 text-xl font-extrabold text-(--nc-text-primary)">
                {formatNumber(completedOrders)}
              </p>

              <p className="mt-1 text-xs text-emerald-500">
                Successfully delivered
              </p>
            </div>

            {/* Pending Orders */}
            <div className="group rounded-xl border border-(--nc-border-color) bg-(--nc-hover-bg) p-4 transition-all duration-200 hover:border-amber-500/40">
              <div className="flex items-center gap-2 text-xs font-medium text-(--nc-text-secondary)">
                <i className="fa-solid fa-hourglass-half text-amber-500" />
                Pending Orders
              </div>

              <p className="mt-2 text-xl font-extrabold text-(--nc-text-primary)">
                {formatNumber(pendingOrders)}
              </p>

              <p className="mt-1 text-xs text-amber-500">Awaiting processing</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default OrdersStatusChart;
