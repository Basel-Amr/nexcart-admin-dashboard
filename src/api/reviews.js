import { api } from "./axios";

/**
 * Retrieves the reviews and rating summary for a product.
 *
 * @param {string} productId Product ID.
 * @returns {Promise<Object>} The API response containing review and rating fields.
 */
export async function getProductReviews(productId) {
  const { data } = await api.get(
    `/products/${encodeURIComponent(productId)}/reviews`,
  );
  return data;
}

/**
 * Adds a review to a product.
 *
 * @param {string} productId Product ID.
 * @param {{rating: number, comment: string}} review Review details.
 * @returns {Promise<Object>} The API response containing the created review and rating summary.
 */
export async function addProductReview(productId, review) {
  const { data } = await api.post(
    `/products/${encodeURIComponent(productId)}/reviews`,
    review,
  );
  return data;
}

/**
 * Deletes a review from a product.
 *
 * @param {string} productId Product ID.
 * @param {string} reviewId Review ID.
 * @returns {Promise<Object>} The API response containing the updated rating summary.
 */
export async function deleteProductReview(productId, reviewId) {
  const { data } = await api.delete(
    `/products/${encodeURIComponent(productId)}/reviews/${encodeURIComponent(reviewId)}`,
  );
  return data;
}
