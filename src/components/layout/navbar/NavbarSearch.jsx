import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

const pages = [
  { name: "Dashboard", keywords: ["dashboard", "home"], path: "/" },
  { name: "Customers", keywords: ["customers", "users"], path: "/customers" },
  { name: "Products", keywords: ["products"], path: "/products" },
  {
    name: "Add Product",
    keywords: ["add product", "new product"],
    path: "/products/new",
  },
  { name: "Orders", keywords: ["orders"], path: "/orders" },
  { name: "Carts", keywords: ["carts", "shopping carts"], path: "/carts" },
  { name: "Analytics", keywords: ["analytics", "reports"], path: "/analytics" },
  { name: "Settings", keywords: ["settings"], path: "/settings" },
];

function NavbarSearch() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim().toLowerCase();

    if (!query) return;

    const matchedPage = pages.find((page) =>
      page.keywords.some((keyword) => keyword.includes(query)),
    );

    if (matchedPage) {
      navigate(matchedPage.path);
      setSearch("");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`hidden h-10 w-48 items-center gap-2 rounded-xl border px-3 transition-all lg:flex xl:w-60 ${
        isDark
          ? "border-slate-700 bg-slate-900/60 focus-within:border-(--nc-primary)"
          : "border-(--nc-border-color) bg-(--nc-surface) focus-within:border-(--nc-primary)"
      }`}
    >
      <i className="fa-solid fa-magnifying-glass text-sm text-(--nc-text-secondary)" />

      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search pages..."
        aria-label="Search dashboard pages"
        className="w-full min-w-0 bg-transparent text-sm text-(--nc-text-primary) outline-none placeholder:text-(--nc-text-secondary)"
      />

      <button type="submit" aria-label="Submit search" className="hidden">
        Search
      </button>
    </form>
  );
}

export default NavbarSearch;
