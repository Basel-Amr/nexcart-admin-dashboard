import { useCallback, useEffect, useState } from "react";

import { getAdminDashboard } from "../api/orders";
import LoadingPage from "./LoadingPage";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import RevenueOverview from "../components/dashboard/RevenueOverview";
import OrdersStatusChart from "../components/dashboard/OrdersStatusChart";
import TopProducts from "../components/dashboard/TopProducts";
import RecentOrders from "../components/dashboard/RecentOrders";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminDashboard();

      // Support both direct API data and Axios response formats.
      const data =
        response?.dashboard ??
        response?.data?.dashboard ??
        response?.data ??
        response;

      if (!data || !data.orders) {
        throw new Error("Invalid dashboard response.");
      }

      setDashboardData(data);
    } catch (err) {
      console.error("Dashboard API error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong while loading dashboard data.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // Use the existing LoadingPage component.
  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500">
          <i className="fa-solid fa-triangle-exclamation text-2xl" />
        </div>

        <h2 className="text-xl font-bold text-(--nc-text-primary)">
          Unable to load dashboard
        </h2>

        <p className="mt-2 max-w-md text-sm text-(--nc-text-secondary)">
          {error}
        </p>

        <button
          onClick={fetchDashboard}
          className="mt-6 rounded-lg bg-(--nc-primary) px-5 py-2.5 font-semibold text-white transition hover:bg-(--nc-primary-hover)"
        >
          <i className="fa-solid fa-rotate-right mr-2" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <DashboardHeader onRefresh={fetchDashboard} />

      <DashboardStats data={dashboardData} />

      <RevenueOverview revenue={dashboardData.revenue} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <OrdersStatusChart ordersByStatus={dashboardData.ordersByStatus} />

        <TopProducts products={dashboardData.topProducts} />
      </div>

      <RecentOrders orders={dashboardData.recentOrders} />
    </div>
  );
}

export default Dashboard;
