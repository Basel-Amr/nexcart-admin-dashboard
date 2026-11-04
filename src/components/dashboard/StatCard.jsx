function StatCard({ title, value, icon, description, iconColor }) {
  return (
    <div className="rounded-xl border border-(--nc-border-color) bg-(--nc-surface) p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-(--nc-text-secondary)">
            {title}
          </p>

          <h3 className="mt-3 text-2xl font-bold text-(--nc-text-primary)">
            {value}
          </h3>

          <p className="mt-2 text-xs text-(--nc-text-secondary)">
            {description}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${iconColor}`}
        >
          <i className={icon} />
        </div>
      </div>
    </div>
  );
}

export default StatCard;
