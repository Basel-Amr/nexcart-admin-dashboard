// Displays service status and version
function SidebarFooter() {
  return (
    <div className="shrink-0 border-t border-slate-800 p-3">
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>

          <span className="text-[11px] font-medium text-slate-300">
            Dashboard services
          </span>

          <span className="ml-auto text-[9px] font-semibold text-emerald-400">
            Ready
          </span>
        </div>

        <p className="mt-1.5 text-[10px] leading-4 text-slate-500">
          Your store management, all in one place.
        </p>
      </div>

      <p className="mt-2 text-center text-[9px] tracking-wide text-slate-600">
        NEXCART ADMIN · V1.0
      </p>
    </div>
  );
}

export default SidebarFooter;
