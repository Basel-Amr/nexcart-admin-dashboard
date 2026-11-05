const STAT_CONFIG = [
  {
    key: "total",
    title: "Products Found",
    icon: "fa-solid fa-boxes-stacked",
    color: "text-cyan-500",
    background: "bg-cyan-500/10",
    description: "Matching your current filters",
  },
  {
    key: "featured",
    title: "Featured Products",
    icon: "fa-solid fa-star",
    color: "text-amber-500",
    background: "bg-amber-500/10",
    description: "On the current page",
  },
  {
    key: "lowStock",
    title: "Low Stock",
    icon: "fa-solid fa-triangle-exclamation",
    color: "text-orange-500",
    background: "bg-orange-500/10",
    description: "1–5 units on the current page",
  },
  {
    key: "outOfStock",
    title: "Out of Stock",
    icon: "fa-solid fa-circle-exclamation",
    color: "text-rose-500",
    background: "bg-rose-500/10",
    description: "On the current page",
  },
];

function ProductStats({ stats = {} }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STAT_CONFIG.map((item) => (
        <article
          key={item.key}
          className="group relative overflow-hidden rounded-2xl border border-(--nc-border-color) bg-(--nc-surface) p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-(--nc-text-secondary)">
                {item.title}
              </p>

              <p className="mt-3 text-3xl font-extrabold tracking-tight text-(--nc-text-primary)">
                {Number(stats?.[item.key] ?? 0).toLocaleString("en-US")}
              </p>
            </div>

            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.background} ${item.color} transition-transform duration-300 group-hover:scale-110`}
            >
              <i className={`${item.icon} text-lg`} />
            </div>
          </div>

          <p className="relative z-10 mt-3 text-xs text-(--nc-text-secondary)">
            {item.description}
          </p>

          <div
            className={`pointer-events-none absolute -bottom-8 -right-5 h-24 w-24 rounded-full opacity-[0.07] blur-xl ${item.background}`}
          />
        </article>
      ))}
    </section>
  );
}

export default ProductStats;
