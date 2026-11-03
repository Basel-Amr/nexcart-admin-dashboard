/* =========================================
   NEXCART - USER ACTIONS
========================================= */

import { toggleUserRole, deleteUser, getUsers } from "../../data/users";

function UserActions({ user, onEdit, onUsersChange }) {
  /* =========================================
     REFRESH USERS
  ========================================= */

  const refreshUsers = () => {
    if (onUsersChange) {
      onUsersChange(getUsers());
    }
  };

  /* =========================================
     EDIT USER
  ========================================= */

  const handleEdit = () => {
    if (onEdit) {
      onEdit(user);
    }
  };

  /* =========================================
     TOGGLE USER ROLE
  ========================================= */

  const handleToggleRole = () => {
    try {
      const updatedUser = toggleUserRole(user.id);

      refreshUsers();

      console.log(`${updatedUser.username} is now ${updatedUser.role}`);
    } catch (error) {
      alert(error.message);
    }
  };

  /* =========================================
     DELETE USER
  ========================================= */

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.username}?`,
    );

    if (!confirmed) return;

    try {
      deleteUser(user.id);

      refreshUsers();
    } catch (error) {
      alert(error.message);
    }
  };

  /* =========================================
     ACTION BUTTONS CONFIGURATION
  ========================================= */

  const actionButtons = [
    {
      name: "Edit user",
      icon: "fa-solid fa-pen",
      onClick: handleEdit,

      color: `
        bg-blue-500/10
        text-blue-500
        border-blue-500/20
        hover:bg-blue-500
        hover:text-white
        hover:border-blue-500
        hover:shadow-blue-500/25
      `,
    },

    {
      name: user.role === "admin" ? "Change to customer" : "Promote to admin",

      icon:
        user.role === "admin"
          ? "fa-solid fa-user"
          : "fa-solid fa-shield-halved",

      onClick: handleToggleRole,

      color: `
        bg-emerald-500/10
        text-emerald-500
        border-emerald-500/20
        hover:bg-emerald-500
        hover:text-white
        hover:border-emerald-500
        hover:shadow-emerald-500/25
      `,
    },

    {
      name: "Delete user",
      icon: "fa-regular fa-trash-can",
      onClick: handleDelete,

      color: `
        bg-rose-500/10
        text-rose-500
        border-rose-500/20
        hover:bg-rose-500
        hover:text-white
        hover:border-rose-500
        hover:shadow-rose-500/25
      `,
    },
  ];

  /* =========================================
     COMPONENT UI
  ========================================= */

  return (
    <div className="flex items-center justify-center gap-2">
      {actionButtons.map((action) => (
        <button
          key={action.name}
          type="button"
          onClick={action.onClick}
          title={action.name}
          aria-label={action.name}
          className={`
            group relative
            flex h-10 w-10 shrink-0
            items-center justify-center

            rounded-xl border

            text-sm

            transition-all
            duration-200
            ease-out

            hover:-translate-y-1
            hover:shadow-lg

            active:translate-y-0
            active:scale-95

            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-(--nc-primary)
            focus-visible:ring-offset-2

            ${action.color}
          `}
        >
          <i
            className={`
              ${action.icon}
              transition-transform
              duration-200
              group-hover:scale-110
            `}
          />
        </button>
      ))}
    </div>
  );
}

export default UserActions;
