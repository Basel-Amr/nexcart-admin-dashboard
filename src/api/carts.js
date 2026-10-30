import { api } from "./axios";

/**
 * Retrieves the current user's cart.
 *
 * @returns {Promise<Object>} The documented cart response.
 */
export async function getCart() {
  const { data } = await api.get("/carts");
  return data;
}

/**
 * Adds a product to the current user's cart.
 *
 * @param {{productId: string, quantity?: number}} item Product ID and optional quantity.
 * @returns {Promise<Object>} The API response containing cart totals and items.
 */
export async function addCartItem(item) {
  const { data } = await api.post("/carts/items", item);
  return data;
}

/**
 * Updates a cart item's quantity.
 *
 * @param {{productId: string, quantity: number}} item Product ID and new quantity.
 * @returns {Promise<Object>} The documented cart response.
 */
export async function updateCartItem(item) {
  const { data } = await api.patch("/carts/items", item);
  return data;
}

/**
 * Removes a product from the current user's cart.
 *
 * @param {string} productId Product ID.
 * @returns {Promise<Object>} The documented cart response.
 */
export async function removeCartItem(productId) {
  const { data } = await api.delete(
    `/carts/items/${encodeURIComponent(productId)}`,
  );
  return data;
}

/**
 * Applies a coupon to the current user's cart.
 *
 * @param {{code: string}} coupon Coupon code.
 * @returns {Promise<Object>} The API response containing the updated totals and coupon.
 */
export async function applyCoupon(coupon) {
  const { data } = await api.post("/carts/coupon", coupon);
  return data;
}

/**
 * Removes the applied coupon from the current user's cart.
 *
 * @returns {Promise<Object>} The API response containing updated cart totals.
 */
export async function removeCoupon() {
  const { data } = await api.delete("/carts/coupon");
  return data;
}

/**
 * Clears the current user's cart.
 *
 * @returns {Promise<Object>} The API's success response.
 */
export async function clearCart() {
  const { data } = await api.delete("/carts/clear");
  return data;
}
