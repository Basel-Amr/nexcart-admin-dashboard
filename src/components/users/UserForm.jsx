import { useEffect, useState } from "react";
import { addUser, updateUser } from "../../data/users";
import { useTheme } from "../../context/ThemeContext";

const emptyForm = {
  username: "",
  email: "",
  password: "",
  phone: "",
  role: "customer",
  verified: false,
};

function UserForm({ user, onSaved, onCancel }) {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isEditing = Boolean(user);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "",
        phone: user.phone || "",
        role: user.role || "customer",
        verified: Boolean(user.verified),
      });
    } else {
      setFormData(emptyForm);
    }

    setError("");
    setShowPassword(false);
  }, [user]);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    try {
      const userData = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        role: formData.role,
        verified: formData.verified,
      };

      if (formData.password.trim()) {
        userData.password = formData.password;
      }

      if (isEditing) {
        updateUser(user.id, userData);
      } else {
        if (!formData.password.trim()) {
          setError("Please enter a password for the new user.");
          return;
        }

        addUser(userData);
      }

      onSaved();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  const inputClass = `w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[var(--nc-primary)] focus:ring-2 focus:ring-[var(--nc-primary)]/10 ${
    isDark
      ? "border-[var(--nc-dark-border)] bg-[var(--nc-dark-page)] text-white placeholder:text-slate-500"
      : "border-[var(--nc-border)] bg-white text-[var(--nc-text)] placeholder:text-slate-400"
  }`;

  const labelClass = `mb-2 block text-sm font-semibold ${
    isDark ? "text-slate-200" : "text-[var(--nc-text)]"
  }`;

  return (
    <form
      onSubmit={handleSubmit}
      className={`overflow-hidden rounded-2xl border shadow-sm ${
        isDark
          ? "border-[var(--nc-dark-border)] bg-[var(--nc-dark-card)]"
          : "border-[var(--nc-border)] bg-white"
      }`}
    >
      {/* Form heading */}
      <div
        className={`flex items-center justify-between gap-3 border-b px-5 py-4 sm:px-6 ${
          isDark
            ? "border-[var(--nc-dark-border)]"
            : "border-[var(--nc-border)]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--nc-primary)]/10 text-[var(--nc-primary)]">
            <i
              className={`fa-solid ${isEditing ? "fa-user-pen" : "fa-user-plus"}`}
            />
          </div>

          <div>
            <h3
              className={`font-bold ${
                isDark ? "text-white" : "text-[var(--nc-text)]"
              }`}
            >
              {isEditing ? "Edit User" : "Create New User"}
            </h3>

            <p
              className={`text-xs ${
                isDark
                  ? "text-[var(--nc-dark-muted)]"
                  : "text-[var(--nc-text-muted)]"
              }`}
            >
              {isEditing
                ? "Update this user's account information."
                : "Fill in the details to add a new account."}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCancel}
          aria-label="Close form"
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-rose-500/10 hover:text-rose-500 ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          <i className="fa-solid fa-xmark" />
        </button>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
        <div>
          <label className={labelClass}>Username *</label>
          <input
            required
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter full name"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Email Address *</label>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@nexcart.com"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Password {isEditing ? "(leave blank to keep current)" : "*"}
          </label>

          <div className="relative">
            <input
              required={!isEditing}
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={
                isEditing ? "Keep current password" : "Enter password"
              }
              className={`${inputClass} pr-12`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              <i
                className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              />
            </button>
          </div>
        </div>

        <div>
          <label className={labelClass}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+20 100 000 0000"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Account Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex items-end">
          <label
            className={`flex min-h-12 w-full cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 ${
              isDark
                ? "border-[var(--nc-dark-border)] bg-[var(--nc-dark-page)]"
                : "border-[var(--nc-border)] bg-slate-50"
            }`}
          >
            <input
              type="checkbox"
              name="verified"
              checked={formData.verified}
              onChange={handleChange}
              className="h-4 w-4 accent-[var(--nc-primary)]"
            />

            <span
              className={`text-sm font-medium ${
                isDark ? "text-slate-200" : "text-[var(--nc-text)]"
              }`}
            >
              Verified account
            </span>
          </label>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mx-5 mb-4 flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-500 sm:mx-6">
          <i className="fa-solid fa-circle-exclamation" />
          {error}
        </div>
      )}

      {/* Form actions */}
      <div
        className={`flex flex-col-reverse justify-end gap-3 border-t px-5 py-4 sm:flex-row sm:px-6 ${
          isDark
            ? "border-[var(--nc-dark-border)]"
            : "border-[var(--nc-border)]"
        }`}
      >
        <button
          type="button"
          onClick={onCancel}
          className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition hover:bg-slate-500/10 ${
            isDark
              ? "border-[var(--nc-dark-border)] text-slate-300"
              : "border-[var(--nc-border)] text-slate-600"
          }`}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-xl bg-[var(--nc-primary)] px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-[var(--nc-primary-hover)] hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <i
            className={`fa-solid ${isEditing ? "fa-floppy-disk" : "fa-user-plus"} mr-2`}
          />
          {isEditing ? "Save Changes" : "Create User"}
        </button>
      </div>
    </form>
  );
}

export default UserForm;
