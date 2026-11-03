import { useEffect, useMemo, useState } from "react";

import { getUsers } from "../data/users";

import UserManagement from "../components/users/UserManagement";
import UserStats from "../components/users/UserStats";
import UserForm from "../components/users/UserForm";
import UserTable from "../components/users/UserTable";

const USERS_PER_PAGE = 5;

function Users() {
  // =========================================
  // STATE
  // =========================================

  const [users, setUsers] = useState(() => getUsers());
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // =========================================
  // REFRESH USERS FROM users.js
  // =========================================

  const refreshUsers = () => {
    setUsers(getUsers());
  };

  // =========================================
  // ADD USER
  // =========================================

  const handleAddUser = () => {
    if (isFormOpen && !editingUser) {
      setIsFormOpen(false);
      return;
    }

    setEditingUser(null);
    setIsFormOpen(true);
  };

  // =========================================
  // EDIT USER
  // =========================================

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================
  // CLOSE FORM
  // =========================================

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  // =========================================
  // SAVE USER
  // =========================================

  const handleUserSaved = () => {
    refreshUsers();
    setCurrentPage(1);
    handleCloseForm();
  };

  // =========================================
  // SEARCH USERS
  // =========================================

  const filteredUsers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) return users;

    return users.filter((user) => {
      return (
        user.username?.toLowerCase().includes(search) ||
        user.email?.toLowerCase().includes(search) ||
        user.phone?.toLowerCase().includes(search) ||
        user.role?.toLowerCase().includes(search) ||
        String(user.id).includes(search)
      );
    });
  }, [users, searchTerm]);

  // =========================================
  // PAGINATION
  // =========================================

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / USERS_PER_PAGE),
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;

  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE,
  );

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  // =========================================
  // SEARCH HANDLER
  // =========================================

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // =========================================
  // USERS UPDATE HANDLER
  // =========================================

  const handleUsersChange = (updatedUsers) => {
    setUsers(updatedUsers);

    const search = searchTerm.trim().toLowerCase();

    const updatedFilteredUsers = updatedUsers.filter((user) => {
      return (
        !search ||
        user.username?.toLowerCase().includes(search) ||
        user.email?.toLowerCase().includes(search) ||
        user.phone?.toLowerCase().includes(search) ||
        user.role?.toLowerCase().includes(search) ||
        String(user.id).includes(search)
      );
    });

    const updatedTotalPages = Math.max(
      1,
      Math.ceil(updatedFilteredUsers.length / USERS_PER_PAGE),
    );

    setCurrentPage((page) => Math.min(page, updatedTotalPages));
  };

  // =========================================
  // PAGE UI
  // =========================================

  return (
    <div
      className="
        w-full min-w-0 min-h-full
        space-y-6
        bg-transparent
        text-[var(--nc-text-primary)]
        transition-colors duration-200
      "
    >
      {/* ROW 1: USER MANAGEMENT */}

      <UserManagement
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onAddClick={handleAddUser}
        isFormOpen={isFormOpen}
        isEditing={Boolean(editingUser)}
      />

      {/* ADD / EDIT USER FORM */}

      {isFormOpen && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <UserForm
            user={editingUser}
            onSaved={handleUserSaved}
            onCancel={handleCloseForm}
          />
        </div>
      )}

      {/* ROW 2: USER STATISTICS */}

      <UserStats users={users} />

      {/* USERS TABLE */}

      <UserTable
        users={currentUsers}
        onEdit={handleEditUser}
        onUsersChange={handleUsersChange}
      />

      {/* =====================================
          PAGINATION
      ===================================== */}

      <div
        className="
          flex flex-col gap-4
          rounded-2xl border p-4
          border-[var(--nc-border-color)]
          bg-[var(--nc-surface)]
          text-[var(--nc-text-primary)]
          shadow-[var(--nc-card-shadow)]
          transition-colors duration-200
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        {/* SHOWING INFORMATION */}

        <p className="text-sm text-[var(--nc-text-secondary)]">
          Showing{" "}
          <span className="font-bold text-[var(--nc-primary)]">
            {filteredUsers.length === 0 ? 0 : startIndex + 1}
          </span>{" "}
          to{" "}
          <span className="font-bold text-[var(--nc-primary)]">
            {Math.min(startIndex + USERS_PER_PAGE, filteredUsers.length)}
          </span>{" "}
          of{" "}
          <span className="font-bold text-[var(--nc-text-primary)]">
            {filteredUsers.length}
          </span>{" "}
          users
        </p>

        {/* PAGE CONTROLS */}

        <div className="flex flex-wrap items-center gap-2">
          {/* PREVIOUS BUTTON */}

          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            className="
              flex h-9 items-center gap-2
              rounded-lg border px-3
              border-[var(--nc-border-color)]
              text-sm font-semibold
              text-[var(--nc-text-secondary)]
              transition-all duration-200
              hover:bg-[var(--nc-hover-bg)]
              hover:text-[var(--nc-primary)]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <i className="fa-solid fa-chevron-left text-xs" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* PAGE NUMBERS */}

          {pageNumbers.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={`
                h-9 min-w-9 rounded-lg px-3
                text-sm font-bold
                transition-all duration-200
                ${
                  currentPage === page
                    ? "bg-[var(--nc-primary)] text-slate-950 shadow-md shadow-cyan-500/20"
                    : "text-[var(--nc-text-secondary)] hover:bg-[var(--nc-hover-bg)] hover:text-[var(--nc-primary)]"
                }
              `}
            >
              {page}
            </button>
          ))}

          {/* NEXT BUTTON */}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            className="
              flex h-9 items-center gap-2
              rounded-lg border px-3
              border-[var(--nc-border-color)]
              text-sm font-semibold
              text-[var(--nc-text-secondary)]
              transition-all duration-200
              hover:bg-[var(--nc-hover-bg)]
              hover:text-[var(--nc-primary)]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <span className="hidden sm:inline">Next</span>
            <i className="fa-solid fa-chevron-right text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Users;
