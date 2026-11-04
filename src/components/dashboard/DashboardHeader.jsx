function DashboardHeader({ onRefresh }) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold text-(--nc-text-primary)">
          Dashboard Overview
        </h1>

        <p className="mt-1 text-sm text-(--nc-text-secondary)">
          Monitor your store performance and activity.
        </p>
      </div>

      <button
        onClick={onRefresh}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-(--nc-border-color) bg-(--nc-surface) px-4 py-2.5 text-sm font-semibold text-(--nc-text-primary) transition hover:bg-(--nc-hover-bg)"
      >
        <i className="fa-solid fa-rotate-right" />
        Refresh Data
      </button>
    </div>
  );
}

export default DashboardHeader;
