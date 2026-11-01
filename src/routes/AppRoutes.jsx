import React from "react";
import { Routes, Route } from "react-router-dom";

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

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Loading Page */}
      <Route path="/loading" element={<LoadingPage />} />

      {/* Admin Dashboard Layout */}
      <Route element={<AdminLayout />}>
        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Store Management */}
        <Route path="customers" element={<Users />} />

        <Route path="products" element={<Products />} />

        <Route path="products/new" element={<AddProduct />} />

        <Route path="products/:productId/edit" element={<EditProduct />} />

        <Route path="orders" element={<Orders />} />

        <Route path="orders/:orderId" element={<OrderDetails />} />

        <Route path="carts" element={<Carts />} />

        {/* Insights & Preferences */}
        <Route path="analytics" element={<Analytics />} />

        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 404 - Page Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
