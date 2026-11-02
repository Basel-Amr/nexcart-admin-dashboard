function SidebarFooter() {
  return (
    <footer className="shrink-0 px-3 pb-4 pt-3">
      {/* Dashboard status card */}
      <div className="rounded-xl border border-(--nc-border-color) bg-(--nc-surface) p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />

            <span className="text-xs font-medium text-(--nc-text-primary)">
              Dashboard services
            </span>
          </div>

          <span className="text-[10px] font-bold text-emerald-500">Ready</span>
        </div>

        <p className="mt-2 text-[11px] leading-relaxed text-(--nc-text-secondary)">
          Your store management, all in one place.
        </p>
      </div>

      {/* Version */}
      <p className="mt-3 text-center text-[9px] font-medium uppercase tracking-wider text-(--nc-text-secondary) opacity-70">
        NexCart Admin · V1.0
      </p>
    </footer>
  );
}

export default SidebarFooter;
