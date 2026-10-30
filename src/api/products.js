import { api } from "./axios";

/**
 * Retrieves a paginated product list with documented filters.
 *
 * @param {{page?: number, limit?: number, category?: string, brand?: string, minPrice?: number, maxPrice?: number, search?: string, sort?: "price_asc"|"price_desc"|"rating"}} [params={}] Query filters.
 * @returns {Promise<Object>} The API response containing pagination fields and `products`.
 */
export async function getProducts(params = {}) {
  const { data } = await api.get("/products", { params });
  return data;
}

/**
 * Searches products using the documented search filters.
 *
 * @param {{search?: string, category?: string, subcategory?: string, brand?: string, tags?: string, minPrice?: number, maxPrice?: number, sort?: "price_asc"|"price_desc"|"rating"|"popular"|"oldest", page?: number, limit?: number}} [params={}] Search filters.
 * @returns {Promise<Object>} The API response containing pagination fields and `products`.
 */
export async function searchProducts(params = {}) {
  const { data } = await api.get("/products/search", { params });
  return data;
}

/**
 * Retrieves a product by ID.
 *
 * @param {string} id Product ID.
 * @returns {Promise<Object>} The API response containing the product.
 */
export async function getProductById(id) {
  const { data } = await api.get(`/products/${encodeURIComponent(id)}`);
  return data;
}

/**
 * Creates a product using multipart form data as documented by the API.
 *
 * @param {FormData} product FormData containing the documented product fields and image file(s).
 * @returns {Promise<Object>} The API response containing the created product.
 */
export async function createProduct(product) {
  const { data } = await api.post("/products", product);
  return data;
}

/**
 * Updates a product using the documented multipart form-data contract.
 *
 * @param {string} id Product ID.
 * @param {FormData} changes FormData containing product fields and optional image updates.
 * @returns {Promise<Object>} The API response containing the updated product.
 */
export async function updateProduct(id, changes) {
  const { data } = await api.patch(
    `/products/update/${encodeURIComponent(id)}`,
    changes,
  );
  return data;
}

/**
 * Deletes a product (admin operation).
 *
 * @param {string} id Product ID.
 * @returns {Promise<Object>} The API's success response.
 */
export async function deleteProduct(id) {
  const { data } = await api.delete(`/products/${encodeURIComponent(id)}`);
  return data;
}
