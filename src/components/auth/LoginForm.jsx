import { Link } from "react-router-dom";
import NexCartLogo from "../../assets/NexCart-logo.png";

function LoginForm({
  formData,
  rememberMe,
  showPassword,
  error,
  onChange,
  onSubmit,
  onRememberChange,
  onTogglePassword,
  onGoogleLogin,
}) {
  return (
    <div className="nc-login-right-panel flex min-w-0 flex-col justify-center p-5 sm:p-7 lg:p-6 xl:p-8">
      <div className="mx-auto w-full max-w-xl">
        {/* Brand logo */}
        <div className="mb-5 flex flex-col items-center text-center xl:mb-6">
          <Link
            to="/login"
            aria-label="NexCart login"
            className="nc-login-logo group flex flex-col items-center"
          >
            <img
              src={NexCartLogo}
              alt="NexCart logo"
              className="h-14 w-14 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16 xl:h-[72px] xl:w-[72px]"
            />

            <span className="mt-1 text-3xl font-extrabold tracking-tight text-white">
              Nex<span className="text-(--nc-primary)">Cart</span>
            </span>

            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-slate-500">
              Admin Dashboard
            </span>
          </Link>

          <div className="nc-brand-divider mx-auto my-4" />

          <h2 className="text-3xl font-extrabold tracking-tight text-white xl:text-4xl">
            Welcome Back!
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400 xl:text-base">
            Sign in to continue to your NexCart dashboard.
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={onSubmit} className="space-y-4 xl:space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-200"
            >
              Email Address
            </label>

            <div className="nc-login-input-wrap flex items-center gap-3 rounded-xl border border-[var(--nc-dark-border)] bg-slate-800/70 px-4 transition focus-within:border-[var(--nc-primary)] focus-within:ring-2 focus-within:ring-cyan-400/10">
              <i className="fa-solid fa-envelope text-slate-500" />

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={onChange}
                required
                className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-500 xl:text-base"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-slate-200"
              >
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-[var(--nc-primary)] transition hover:text-cyan-300"
              >
                Forgot password?
              </Link>
            </div>

            <div className="nc-login-input-wrap flex items-center gap-3 rounded-xl border border-[var(--nc-dark-border)] bg-slate-800/70 px-4 transition focus-within:border-[var(--nc-primary)] focus-within:ring-2 focus-within:ring-cyan-400/10">
              <i className="fa-solid fa-lock text-slate-500" />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={onChange}
                required
                className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-500 xl:text-base"
              />

              <button
                type="button"
                onClick={onTogglePassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="shrink-0 p-1 text-slate-500 transition hover:text-[var(--nc-primary)]"
              >
                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-3">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => onRememberChange(event.target.checked)}
              className="h-4 w-4 cursor-pointer rounded accent-cyan-400"
            />

            <label
              htmlFor="rememberMe"
              className="cursor-pointer text-sm text-slate-400"
            >
              Remember me
            </label>
          </div>

          {/* Error message */}
          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300"
            >
              <i className="fa-solid fa-circle-exclamation mr-2" />
              {error}
            </p>
          )}

          {/* Sign in */}
          <button
            type="submit"
            className="nc-login-submit group flex w-full items-center justify-center gap-3 rounded-xl bg-[var(--nc-primary)] px-5 py-3.5 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/20 active:translate-y-0"
          >
            <span>Sign In</span>

            <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-4 xl:my-6">
          <div className="h-px flex-1 bg-slate-700" />

          <span className="text-sm font-medium text-slate-500">OR</span>

          <div className="h-px flex-1 bg-slate-700" />
        </div>

        {/* Google sign in placeholder */}
        <button
          type="button"
          onClick={onGoogleLogin}
          className="nc-google-button flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800/90 px-5 py-3.5 font-semibold text-slate-200 transition duration-300 hover:border-slate-600 hover:bg-slate-800 active:scale-[0.99]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            aria-hidden="true"
            className="h-6 w-6 shrink-0"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.98 46.98 31.95 46.98 24.55Z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
            />
          </svg>

          <span>Continue with Google</span>
        </button>

        {/* Security footer */}
        <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
          <i className="fa-solid fa-shield-halved text-(--nc-primary)" />

          <span>Protected access for authorized administrators.</span>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
