import { useTheme } from "../../../context/ThemeContext";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-200 ${
        isDark
          ? "border-slate-700 bg-slate-900/60 text-amber-400 hover:border-amber-400/50 hover:bg-amber-400/10"
          : "border-(--nc-border-color) bg-(--nc-surface) text-amber-500 hover:border-amber-400 hover:bg-amber-50"
      }`}
    >
      <i className={`fa-solid ${isDark ? "fa-sun" : "fa-moon"} text-lg`} />
    </button>
  );
}

export default ThemeToggle;
