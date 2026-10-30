import { api } from "./axios";

/**
 * Places an order from the current user's cart.
 *
 * @param {{shippingAddress: {fullName: string, phone: string, country: string, city: string, address: string, postalCode?: string}, paymentMethod?: "cash"|"stripe"|"paypal"|"paymob", customerNote?: string}} order Order details.
 * @returns {Promise<Object>} The API response containing the created order.
 */
export async function createOrder(order) {
  const { data } = await api.post("/orders", order);
  return data;
}

/**
 * Retrieves the current user's paginated orders.
 *
 * @param {{page?: number, limit?: number, status?: string}} [params={}] Pagination and documented status filter.
 * @returns {Promise<Object>} The API response containing pagination fields and `orders`.
 */
export async function getMyOrders(params = {}) {
  const { data } = await api.get("/orders/my", { params });
  return data;
}

/**
 * Retrieves one of the current user's orders.
 *
 * @param {string} id Order ID.
 * @returns {Promise<Object>} The API response containing the order.
 */
export async function getMyOrderById(id) {
  const { data } = await api.get(`/orders/my/${encodeURIComponent(id)}`);
  return data;
}

/**
 * Cancels one of the current user's orders.
 *
 * @param {string} id Order ID.
 * @returns {Promise<Object>} The API response containing the updated order.
 */
export async function cancelMyOrder(id) {
  const { data } = await api.patch(
    `/orders/my/${encodeURIComponent(id)}/cancel`,
  );
  return data;
}

/**
 * Retrieves the admin dashboard summary.
 *
 * @returns {Promise<Object>} The documented admin dashboard response.
 */
export async function getAdminDashboard() {
  const { data } = await api.get("/orders/admin/dashboard");
  return data;
}

/**
 * Retrieves active carts with admin pagination.
 *
 * @param {{page?: number, limit?: number}} [params={}] Pagination parameters.
 * @returns {Promise<Object>} The API response containing pagination fields and `carts`.
 */
export async function getAdminCarts(params = {}) {
  const { data } = await api.get("/orders/admin/carts", { params });
  return data;
}

/**
 * Retrieves and filters orders in the admin panel.
 *
 * @param {{page?: number, limit?: number, status?: string, paymentStatus?: string, from?: string, to?: string, sortBy?: string, sortDir?: "asc"|"desc"}} [params={}] Documented pagination, filter, and sort parameters.
 * @returns {Promise<Object>} The API response containing pagination fields and `orders`.
 */
export async function getAdminOrders(params = {}) {
  const { data } = await api.get("/orders/admin", { params });
  return data;
}

/**
 * Retrieves an order by ID (admin operation).
 *
 * @param {string} id Order ID.
 * @returns {Promise<Object>} The API response containing the order.
 */
export async function getAdminOrderById(id) {
  const { data } = await api.get(`/orders/admin/${encodeURIComponent(id)}`);
  return data;
}

/**
 * Updates an order's status as an administrator.
 *
 * @param {string} id Order ID.
 * @param {{status: "pending"|"confirmed"|"processing"|"shipped"|"delivered"|"cancelled"|"returned", adminNote?: string}} changes Status and optional admin note.
 * @returns {Promise<Object>} The API response containing the updated order.
 */
export async function updateAdminOrderStatus(id, changes) {
  const { data } = await api.patch(
    `/orders/admin/${encodeURIComponent(id)}/status`,
    changes,
  );
  return data;
}
