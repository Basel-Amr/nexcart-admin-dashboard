import { useLocation } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

const pageTitles = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/customers": "Customers",
  "/products": "Products",
  "/products/new": "Add Product",
  "/orders": "Orders",
  "/carts": "Carts",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

function PageHeading({ adminName = "AdminText" }) {
  const { pathname } = useLocation();
  const { isDark } = useTheme();

  const pageTitle =
    pageTitles[pathname] ||
    (pathname.startsWith("/products/")
      ? "Edit Product"
      : pathname.startsWith("/orders/")
        ? "Order Details"
        : "Admin");

  return (
    <div className="min-w-0 flex-1">
      {/* Workspace label */}
      <div className="mb-1 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-(--nc-primary)" />

        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-(--nc-primary)">
          Admin Workspace
        </span>
      </div>

      {/* Welcome heading */}
      <h1
        className={`truncate text-xl font-bold tracking-tight sm:text-2xl ${
          isDark ? "text-white" : "text-(--nc-text-primary)"
        }`}
      >
        Welcome back, {adminName}
      </h1>

      {/* Page description */}
      <p className="mt-1 hidden text-sm text-(--nc-text-secondary) sm:block">
        {pageTitle} · Everything you need to manage your store.
      </p>
    </div>
  );
}

export default PageHeading;
