function formatNumber(value) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value ?? 0);
}

function formatDate(date) {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getStatusStyle(status) {
  const styles = {
    pending: "bg-amber-500/10 text-amber-500",
    processing: "bg-blue-500/10 text-blue-500",
    confirmed: "bg-cyan-500/10 text-cyan-500",
    shipped: "bg-violet-500/10 text-violet-500",
    delivered: "bg-emerald-500/10 text-emerald-500",
    cancelled: "bg-red-500/10 text-red-500",
    returned: "bg-orange-500/10 text-orange-500",
  };

  return styles[status?.toLowerCase()] || "bg-gray-500/10 text-gray-500";
}

function RecentOrders({ orders = [] }) {
  return (
    <section className="overflow-hidden rounded-xl border border-(--nc-border-color) bg-(--nc-surface) shadow-sm">
      <div className="border-b border-(--nc-border-color) p-5">
        <h2 className="text-lg font-bold text-(--nc-text-primary)">
          Recent Orders
        </h2>

        <p className="mt-1 text-sm text-(--nc-text-secondary)">
          The latest orders placed in your store.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="p-8 text-center text-sm text-(--nc-text-secondary)">
          No recent orders available.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="bg-(--nc-hover-bg) text-(--nc-text-secondary)">
              <tr>
                <th className="px-5 py-4 font-semibold">Order ID</th>
                <th className="px-5 py-4 font-semibold">Customer</th>
                <th className="px-5 py-4 font-semibold">Date</th>
                <th className="px-5 py-4 font-semibold">Amount</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-(--nc-border-color)">
              {orders.map((order) => {
                const customerName =
                  order.user?.name ||
                  order.shippingAddress?.fullName ||
                  "Unknown Customer";

                return (
                  <tr
                    key={order._id}
                    className="transition hover:bg-(--nc-hover-bg)"
                  >
                    <td className="px-5 py-4 font-medium text-(--nc-text-primary)">
                      #{order._id?.slice(-8).toUpperCase()}
                    </td>

                    <td className="px-5 py-4 text-(--nc-text-primary)">
                      {customerName}
                    </td>

                    <td className="px-5 py-4 text-(--nc-text-secondary)">
                      {formatDate(order.createdAt)}
                    </td>

                    <td className="px-5 py-4 font-semibold text-(--nc-text-primary)">
                      {formatNumber(order.totalPrice)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                          order.status,
                        )}`}
                      >
                        {order.status || "Unknown"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default RecentOrders;
