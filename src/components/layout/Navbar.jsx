import PageHeading from "./navbar/PageHeading";
import NavbarSearch from "./navbar/NavbarSearch";
import NavbarNotifications from "./navbar/NavbarNotifications";
import ThemeToggle from "./navbar/ThemeToggle";
import AdminProfile from "./navbar/AdminProfile";

function Navbar() {
  // Get the logged-in admin's name.
  const adminName = sessionStorage.getItem("adminName") || "TextAdmin";

  return (
    <header className="fixed top-0 right-0 z-50 w-full border-b border-(--nc-border-color) bg-(--nc-surface)/95 text-(--nc-text-primary) shadow-sm backdrop-blur-xl transition-colors duration-200 lg:left-72 lg:w-[calc(100%-18rem)]">
      <div className="flex min-h-[84px] items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-6 lg:px-8">
        {/* LEFT: PAGE HEADING */}
        <PageHeading adminName={adminName} />

        {/* RIGHT: SEARCH AND ACTIONS */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <NavbarSearch />
          <NavbarNotifications />
          <ThemeToggle />
          <AdminProfile adminName={adminName} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
