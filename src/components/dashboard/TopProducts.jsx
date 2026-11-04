function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value ?? 0);
}

function formatRevenue(value) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value ?? 0);
}

const RANK_STYLES = [
  {
    label: "01",
    color: "text-amber-500",
    background: "bg-amber-500/10",
    icon: "fa-solid fa-crown",
  },
  {
    label: "02",
    color: "text-slate-400",
    background: "bg-slate-400/10",
    icon: "fa-solid fa-medal",
  },
  {
    label: "03",
    color: "text-orange-500",
    background: "bg-orange-500/10",
    icon: "fa-solid fa-medal",
  },
];

function TopProducts({ products = [] }) {
  const sortedProducts = [...products].sort(
    (a, b) => (b.totalSold || 0) - (a.totalSold || 0),
  );

  const maxSales = Math.max(
    ...sortedProducts.map((product) => product.totalSold || 0),
    1,
  );

  const totalUnitsSold = sortedProducts.reduce(
    (total, product) => total + (product.totalSold || 0),
    0,
  );

  const totalRevenue = sortedProducts.reduce(
    (total, product) => total + (product.revenue || 0),
    0,
  );

  const topProduct = sortedProducts[0];

  return (
    <section className="overflow-hidden rounded-2xl border border-(--nc-border-color) bg-(--nc-surface) shadow-sm">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 border-b border-(--nc-border-color) p-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500" />

            <h2 className="text-lg font-bold text-(--nc-text-primary)">
              Top Performing Products
            </h2>
          </div>

          <p className="mt-1 text-sm text-(--nc-text-secondary)">
            Discover your store's best-selling products.
          </p>
        </div>

        <span className="w-fit rounded-lg border border-(--nc-border-color) bg-(--nc-hover-bg) px-3 py-1.5 text-xs font-semibold text-(--nc-text-secondary)">
          <i className="fa-solid fa-ranking-star mr-2 text-amber-500" />
          Best Sellers
        </span>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="flex min-h-80 items-center justify-center text-sm text-(--nc-text-secondary)">
          No product data available.
        </div>
      ) : (
        <div className="p-5">
          {/* Featured product */}
          <div className="relative mb-6 overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 p-4">
            <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative flex items-center gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-(--nc-border-color) bg-(--nc-surface) p-2">
                {topProduct.image ? (
                  <img
                    src={topProduct.image}
                    alt={topProduct.name}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-2xl text-(--nc-text-secondary)">
                    <i className="fa-solid fa-box" />
                  </div>
                )}

                <span className="absolute -right-0.5 -top-0.5 flex h-6 w-6 items-center justify-center rounded-bl-lg bg-amber-500 text-xs text-white">
                  <i className="fa-solid fa-crown" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">
                  Best Seller
                </span>

                <h3 className="mt-1 line-clamp-2 text-sm font-bold text-(--nc-text-primary)">
                  {topProduct.name}
                </h3>

                <p className="mt-2 text-xs text-(--nc-text-secondary)">
                  <span className="font-bold text-(--nc-text-primary)">
                    {formatNumber(topProduct.totalSold)}
                  </span>{" "}
                  units sold
                </p>
              </div>

              <div className="hidden shrink-0 text-right sm:block">
                <p className="text-xs text-(--nc-text-secondary)">
                  Product Revenue
                </p>

                <p className="mt-1 text-lg font-extrabold text-(--nc-text-primary)">
                  {formatRevenue(topProduct.revenue)}
                </p>
              </div>
            </div>
          </div>

          {/* Summary cards */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-(--nc-hover-bg) p-4">
              <div className="flex items-center gap-2 text-xs text-(--nc-text-secondary)">
                <i className="fa-solid fa-cubes-stacked text-cyan-500" />
                Units Sold
              </div>

              <p className="mt-2 text-xl font-bold text-(--nc-text-primary)">
                {formatNumber(totalUnitsSold)}
              </p>
            </div>

            <div className="rounded-xl bg-(--nc-hover-bg) p-4">
              <div className="flex items-center gap-2 text-xs text-(--nc-text-secondary)">
                <i className="fa-solid fa-sack-dollar text-emerald-500" />
                Top 5 Revenue
              </div>

              <p className="mt-2 text-xl font-bold text-(--nc-text-primary)">
                {formatRevenue(totalRevenue)}
              </p>
            </div>
          </div>

          {/* Product ranking */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-(--nc-text-primary)">
                Product Rankings
              </h3>

              <span className="text-xs text-(--nc-text-secondary)">
                By units sold
              </span>
            </div>

            <div className="space-y-4">
              {sortedProducts.map((product, index) => {
                const rank = RANK_STYLES[index] || {
                  label: String(index + 1).padStart(2, "0"),
                  color: "text-(--nc-text-secondary)",
                  background: "bg-(--nc-hover-bg)",
                  icon: "fa-solid fa-box",
                };

                const percentage = ((product.totalSold || 0) / maxSales) * 100;

                return (
                  <div key={product._id || product.name}>
                    <div className="flex items-center gap-3">
                      {/* Rank */}
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${rank.background} ${rank.color}`}
                      >
                        {index < 3 ? <i className={rank.icon} /> : rank.label}
                      </div>

                      {/* Image */}
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-(--nc-border-color) bg-(--nc-hover-bg) p-1.5">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-(--nc-text-secondary)">
                            <i className="fa-solid fa-box" />
                          </div>
                        )}
                      </div>

                      {/* Product details */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-(--nc-text-primary)">
                          {product.name}
                        </p>

                        <p className="mt-1 text-xs text-(--nc-text-secondary)">
                          Revenue:{" "}
                          <span className="font-semibold text-(--nc-text-primary)">
                            {formatRevenue(product.revenue)}
                          </span>
                        </p>
                      </div>

                      {/* Units */}
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-(--nc-text-primary)">
                          {formatNumber(product.totalSold)}
                        </p>

                        <p className="text-[10px] text-(--nc-text-secondary)">
                          Sold
                        </p>
                      </div>
                    </div>

                    {/* Sales progress */}
                    <div className="ml-12 mt-2 h-1.5 overflow-hidden rounded-full bg-(--nc-hover-bg)">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          index === 0
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                            : "bg-cyan-500/70"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center gap-2 border-t border-(--nc-border-color) pt-4 text-xs text-(--nc-text-secondary)">
            <i className="fa-solid fa-circle-info text-cyan-500" />
            <span>
              Rankings are based on the sales data returned by your API.
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

export default TopProducts;
