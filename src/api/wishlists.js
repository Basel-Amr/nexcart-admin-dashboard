import { api } from "./axios";

/**
 * Adds a product to the current user's wishlist.
 *
 * @param {string} productId Product ID.
 * @returns {Promise<Object>} The API response; the documented 201 response has no schema.
 */
export async function addProductToWishlist(productId) {
  const { data } = await api.post(
    `/wishlists/add/${encodeURIComponent(productId)}`,
  );
  return data;
}

/**
 * Removes a product from the current user's wishlist.
 *
 * @param {string} productId Product ID.
 * @returns {Promise<Object>} The API response containing the updated wishlist.
 */
export async function removeProductFromWishlist(productId) {
  const { data } = await api.delete(
    `/wishlists/remove/${encodeURIComponent(productId)}`,
  );
  return data;
}

/**
 * Retrieves the current user's wishlist.
 *
 * @returns {Promise<Object>} The API response containing the wishlist and product count.
 */
export async function getMyWishlist() {
  const { data } = await api.get("/wishlists/my");
  return data;
}

/**
 * Clears the current user's wishlist.
 *
 * @returns {Promise<Object>} The API's success response.
 */
export async function clearWishlist() {
  const { data } = await api.delete("/wishlists/clear");
  return data;
}

/**
 * Retrieves all wishlists (admin operation).
 *
 * @param {{page?: number, limit?: number}} [params={}] Pagination parameters.
 * @returns {Promise<Object>} The API response containing pagination fields and `wishlists`.
 */
export async function getAdminWishlists(params = {}) {
  const { data } = await api.get("/wishlists/admin/all", { params });
  return data;
}

/**
 * Retrieves wishlist statistics (admin operation).
 *
 * @returns {Promise<Object>} The API's wishlist statistics response.
 */
export async function getAdminWishlistStats() {
  const { data } = await api.get("/wishlists/admin/stats");
  return data;
}
