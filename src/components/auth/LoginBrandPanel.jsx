import NexCartLogo from "../../assets/NexCart-logo.png";

const features = [
  {
    id: 1,
    icon: "fa-solid fa-chart-line",
    title: "Smart Analytics",
  },
  {
    id: 2,
    icon: "fa-solid fa-box-open",
    title: "Inventory Management",
  },
  {
    id: 3,
    icon: "fa-solid fa-users",
    title: "Customer Insights",
  },
  {
    id: 4,
    icon: "fa-solid fa-shield-halved",
    title: "Secure Administration",
  },
];

function LoginBrandPanel() {
  return (
    <div className="nc-login-left-panel hidden flex-col justify-center bg-(--nc-dark-card) p-8 text-white lg:flex xl:p-12">
      {/* Brand logo */}
      <div className="mb-10 flex w-full items-center gap-5">
        <img
          src={NexCartLogo}
          alt="NexCart Logo"
          className="h-24 w-24 shrink-0 object-contain drop-shadow-[0_8px_18px_rgba(0,190,235,0.18)] transition-transform duration-300 hover:-translate-y-1"
        />

        <h1 className="m-0 whitespace-nowrap text-5xl font-extrabold leading-none tracking-tight sm:text-6xl">
          Nex<span className="text-(--nc-primary)">Cart</span>
        </h1>
      </div>

      {/* Brand message */}
      <div className="w-full max-w-xl">
        <h2 className="flex flex-wrap items-center gap-x-3 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl xl:text-4xl">
          <span>Your Store.</span>
          <span className="text-(--nc-primary)">Your Control.</span>
        </h2>

        {/* Accent divider */}
        <div className="my-4 h-1.5 w-24 overflow-hidden rounded-full bg-(--nc-primary)/20">
          <div className="h-full w-full rounded-full bg-(--nc-primary) shadow-[0_0_12px_var(--nc-primary)]" />
        </div>

        <p className="max-w-md text-sm leading-7 text-slate-400 xl:text-base">
          Manage your e-commerce business with ease. Track sales, organize
          inventory, and control your store from one powerful dashboard.
        </p>
      </div>

      {/* Features */}
      <div className="mt-7 space-y-4 xl:mt-9 xl:space-y-5">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="
              group relative flex cursor-default items-center gap-3
              overflow-hidden rounded-xl border border-transparent
              px-3 py-3 text-sm text-slate-400
              transition-all duration-300 ease-out
              hover:translate-x-2
              hover:border-cyan-400/20
              hover:bg-cyan-400/[0.06]
              hover:text-white
              xl:gap-4 xl:px-4 xl:py-3.5 xl:text-base
            "
          >
            <i
              className={`${feature.icon} w-5 text-center text-(--nc-primary)`}
            />

            <span>{feature.title}</span>
          </div>
        ))}
      </div>

      {/* Brand footer */}
      <div className="mt-10 flex items-center gap-3">
        <span className="h-2 w-2 shrink-0 rounded-full bg-(--nc-primary) shadow-[0_0_12px_rgba(0,190,235,0.65)]" />

        <span className="text-[9px] font-bold tracking-[2px] text-slate-400 sm:text-[10px]">
          SMARTER COMMERCE. SIMPLER MANAGEMENT.
        </span>
      </div>
    </div>
  );
}

export default LoginBrandPanel;
