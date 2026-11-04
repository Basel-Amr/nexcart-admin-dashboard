import React from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";

// Layout
import AdminLayout from "../components/layout/AdminLayout";

// Pages
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";
import Carts from "../pages/Carts";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import LoadingPage from "../pages/LoadingPage";

// Check whether an admin is logged in
const isAuthenticated = () => {
  return sessionStorage.getItem("nexcart-demo-auth") === "true";
};

// Protect admin routes
function ProtectedRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

// Handle the login page
function LoginRoute() {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Login />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route
        path="/"
        element={
          <Navigate to={isAuthenticated() ? "/dashboard" : "/login"} replace />
        }
      />

      {/* Public Route */}
      <Route path="/login" element={<LoginRoute />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/loading" element={<LoadingPage />} />

        {/* Admin Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Store Management */}
          <Route path="/customers" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<AddProduct />} />

          <Route path="/products/:productId/edit" element={<EditProduct />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/orders/:orderId" element={<OrderDetails />} />

          <Route path="/carts" element={<Carts />} />

          {/* Insights & Preferences */}
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
