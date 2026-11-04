import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { getUsers } from "../data/users";

import LoginBrandPanel from "../components/auth/LoginBrandPanel";
import LoginForm from "../components/auth/LoginForm";

import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: localStorage.getItem("nexcart-remembered-email") || "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(
    Boolean(localStorage.getItem("nexcart-remembered-email")),
  );

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // Handle login
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      setError("Please enter your email address and password.");
      return;
    }

    // Get users from localStorage
    const users = getUsers();

    // Find matching admin
    const admin = users.find(
      (user) =>
        user.role === "admin" &&
        user.email?.trim().toLowerCase() === email &&
        user.password === password,
    );

    if (!admin) {
      setError("Invalid admin credentials. Please try again.");
      return;
    }

    // Remember email
    if (rememberMe) {
      localStorage.setItem("nexcart-remembered-email", email);
    } else {
      localStorage.removeItem("nexcart-remembered-email");
    }

    // Save logged-in admin
    const loggedInUser = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    };

    // Create authentication session
    sessionStorage.setItem("nexcart-demo-auth", "true");
    sessionStorage.setItem("nexcart-demo-user", JSON.stringify(loggedInUser));
    sessionStorage.setItem("adminName", admin.username);

    // Redirect to requested page or dashboard
    const redirectTo = location.state?.from?.pathname || "/dashboard";

    navigate(redirectTo, { replace: true });
  };

  // Google login placeholder
  const handleGoogleLogin = () => {
    setError("Google sign-in is not configured yet.");
  };

  return (
    <main className="nc-login-page relative flex min-h-screen items-center justify-center overflow-hidden p-3 sm:p-5">
      {/* Background decoration */}
      <div className="nc-login-glow nc-login-glow-one" />
      <div className="nc-login-glow nc-login-glow-two" />

      {/* Main login container */}
      <section className="nc-login-card relative z-10 grid w-full max-w-[1400px] grid-cols-1 overflow-hidden rounded-3xl border border-[var(--nc-dark-border)] lg:grid-cols-[1fr_1px_1fr]">
        <LoginBrandPanel />

        {/* Vertical separator */}
        <div className="nc-login-panel-divider hidden lg:block" />

        <LoginForm
          formData={formData}
          rememberMe={rememberMe}
          showPassword={showPassword}
          error={error}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onRememberChange={setRememberMe}
          onTogglePassword={() => setShowPassword((previous) => !previous)}
          onGoogleLogin={handleGoogleLogin}
        />
      </section>
    </main>
  );
}

export default Login;
