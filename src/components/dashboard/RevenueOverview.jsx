function formatNumber(value) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value ?? 0);
}

function RevenueOverview({ revenue }) {
  const growth = Number(revenue?.growthPercent ?? 0);
  const hasGrowth = Number.isFinite(growth);

  return (
    <section className="rounded-xl border border-(--nc-border-color) bg-(--nc-surface) p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-(--nc-text-primary)">
            Revenue Overview
          </h2>

          <p className="mt-1 text-sm text-(--nc-text-secondary)">
            Your store revenue performance.
          </p>
        </div>

        <div
          className={`flex items-center gap-2 text-sm font-semibold ${
            growth >= 0 ? "text-emerald-500" : "text-red-500"
          }`}
        >
          <i
            className={`fa-solid ${
              growth >= 0 ? "fa-arrow-trend-up" : "fa-arrow-trend-down"
            }`}
          />
          {hasGrowth ? `${growth}%` : "N/A"} growth
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-(--nc-hover-bg) p-4">
          <p className="text-sm text-(--nc-text-secondary)">This Month</p>
          <h3 className="mt-2 text-2xl font-bold text-(--nc-text-primary)">
            {formatNumber(revenue?.thisMonth)}
          </h3>
        </div>

        <div className="rounded-lg bg-(--nc-hover-bg) p-4">
          <p className="text-sm text-(--nc-text-secondary)">Last Month</p>
          <h3 className="mt-2 text-2xl font-bold text-(--nc-text-primary)">
            {formatNumber(revenue?.lastMonth)}
          </h3>
        </div>
      </div>

      <div className="mt-5 flex min-h-36 flex-col items-center justify-center rounded-lg border border-dashed border-(--nc-border-color) px-4 py-8 text-center">
        <i className="fa-solid fa-chart-line mb-3 text-3xl text-(--nc-text-secondary)" />

        <p className="font-semibold text-(--nc-text-primary)">
          Daily revenue data unavailable
        </p>

        <p className="mt-1 text-sm text-(--nc-text-secondary)">
          The API has not returned daily revenue records yet.
        </p>
      </div>
    </section>
  );
}

export default RevenueOverview;
