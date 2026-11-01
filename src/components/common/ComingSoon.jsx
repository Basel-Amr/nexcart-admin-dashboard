
export default function ComingSoon({ title, description, icon = "fa-solid fa-code" }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
        <i className={`${icon} text-2xl`} aria-hidden="true" />
      </div>

      <p className="text-xs font-bold uppercase tracking-widest text-cyan-600">
        NexCart Development
      </p>

      <h1 className="mt-2 text-3xl font-bold text-slate-900">
        {title}
      </h1>

      <p className="mt-3 max-w-xl leading-7 text-slate-500">
        {description}
      </p>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
        <i className="fa-regular fa-clock" aria-hidden="true" />
        Coming Soon
      </div>

      <p className="mt-4 text-sm text-slate-400">
        This feature is planned for a future update.
      </p>
    </section>
  );
}
